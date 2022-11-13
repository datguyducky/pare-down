import { FC, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Modal, Tracklist, Details, Summary } from '@/components';
import { UsePlaylistDetailsType } from '../../data/types';
import tw from 'twin.macro';
import { nextStepIcon, nextStepText, stepIcon, stepText } from '../../styles';
import { Icons } from '@/icons';
import { UsePlaylistTracksPages } from 'data';
import axios from 'axios';
import { useToast } from '@/toast';
import { useRouter } from 'next/router';

export interface ParedownDetails {
	name: string;
	description: string;
	tracksTotal: number;
	tracksMax: number;
	tracksIsPercent: boolean;
	tracksRealTotal: number;
	public: boolean;
	imgArr: Array<string> | undefined;
}

export interface ParedownStep {
	done: Array<number>;
	active: number;
	inProgress: boolean;
}

const ParedownPlaylist: FC<{
	userId: string;
	playlist: UsePlaylistDetailsType['data'];
	playlistId: string;
	setDisplayPDModal: Dispatch<SetStateAction<boolean>>;
	displayPDModal: boolean;
}> = ({ playlist, playlistId, setDisplayPDModal, displayPDModal, userId }) => {
	const [paredownDetails, setParedownDetails] = useState<ParedownDetails>({
		name: playlist.name,
		description: playlist.description,
		tracksTotal: playlist.tracksTotal,
		tracksRealTotal: playlist.tracksTotal,
		tracksMax: playlist.tracksTotal,
		tracksIsPercent: false,
		public: playlist.public,
		imgArr: undefined,
	});
	const [paredownStep, setParedownStep] = useState<ParedownStep>({
		done: [],
		active: 1,
		inProgress: false,
	});

	const { data: paredownTracks, setSize } = UsePlaylistTracksPages(
		paredownStep.done.indexOf(3) > -1 ? playlistId : null,
		paredownDetails.tracksRealTotal < 100 ? paredownDetails.tracksRealTotal : 100,
	);

	const toast = useToast();
	const router = useRouter();

	function startParedown() {
		// make sure that user added at least 1 song to a playlist
		// if not display toast in order to inform him to fix that
		if (paredownDetails.tracksRealTotal > 0) {
			setParedownStep((prevState) => {
				return {
					...prevState,
					done: [...prevState.done, prevState.active],
				};
			});
		} else {
			toast.add({ message: 'The pared down playlist must contain at least 1 song', appearance: 'error' });
		}
	}

	useEffect(() => {
		if (paredownTracks && paredownTracks.length > 0) {
			// call API as long as number of tracks typed by an user is bigger than the "next" param on the last data object retrieved from API
			if (paredownDetails.tracksRealTotal > paredownTracks[paredownTracks.length - 1].next) {
				const tracksLimitDif = paredownDetails.tracksRealTotal - paredownTracks[paredownTracks.length - 1].next;
				// change "limit" value on the last data object from API in order to make the last call to an API with the proper limit param value
				// example: for 320 of tracks, the last call should have the limit set to 20
				paredownTracks[paredownTracks.length - 1].limit =
					tracksLimitDif > 0 ? (tracksLimitDif < 100 ? tracksLimitDif : 100) : 100;
				setSize((size) => size + 1);
			}

			if (Math.ceil(paredownDetails.tracksRealTotal / 100) === paredownTracks.length) {
				handleParedown();
			}
		}
		//eslint-disable-next-line
	}, [paredownDetails.tracksRealTotal, paredownTracks, setSize]);

	function handleParedown() {
		// Spotify API doesn't let to create a playlist with tracks in it with the same call
		// so we need to make seperate call to create the playlist, and X ammount of other calls
		// to add tracks to it (100 tracks per call)
		axios
			.post<{ id: number }>(`/api/playlists?userId=${userId}`, {
				data: {
					name: playlist.name === paredownDetails.name ? playlist.name + ' Pared Down' : paredownDetails.name,
					isPublic: paredownDetails.public,
					description: paredownDetails.description,
				},
			})
			.then((response) => {
				if (response.statusText === 'OK') {
					const playlistId = response?.data.id;
					// making X calls to add tracks to the freshly created pared down playlist
					for (let i = 0; i < paredownTracks.length; i++) {
						const tracksData: Array<string> = paredownTracks[i].items.map((i) => i.uri);

						axios
							.post(`/api/playlists/${playlistId}/tracks`, {
								data: {
									uris: tracksData,
								},
							})
							.then((response) => {
								if (response.statusText === 'OK') {
									setDisplayPDModal(false);

									toast.add({
										message: 'The playlist has been successfully pared down',
									});

									setTimeout(() => router.push('/dashboard'), 600);
								}
							})
							.catch((error) => {
								toast.add({
									message: 'Sorry, something went wrong: ' + error.response?.data?.message,
									appearance: 'error',
								});
								console.log(error.response?.data);
							});
					}
				}
			})
			.catch((error) => {
				toast.add({
					message: 'Sorry, something went wrong: ' + error.response?.data?.message,
					appearance: 'error',
				});
				console.log(error.response?.data);
			});
	}

	return (
		<Modal
			onClose={() => {
				setDisplayPDModal(false);
			}}
			title='Pare Down'
			description='Duplicate your playlist with a pared down number of songs.'
			isOpen={displayPDModal}
			fullWidthAction={() => {
				paredownStep.active === 3
					? startParedown()
					: paredownStep.active < 3 && paredownStep.active >= 1
					? setParedownStep((prevState) => {
							return {
								...prevState,
								done:
									prevState.done.indexOf(prevState.active) > -1
										? [...prevState.done]
										: [...prevState.done, prevState.active],
								active: prevState.active + 1,
							};
					  })
					: setParedownStep((prevState) => {
							return { ...prevState, active: prevState.active - 1 };
					  });
			}}
			fullWidthText={
				(paredownStep.active === 1 && 'Save Details') ||
				(paredownStep.active === 2 && 'Save Tracklist') ||
				(paredownStep.active === 3 &&
					// make sure that both the first and second step were completed by the user in order to
					// display the pare down button
					([1, 2].every((val) => paredownStep.done.includes(val)) ? 'Pare Down' : undefined))
			}
		>
			<div tw='flex h-full flex-col px-6'>
				<ul tw='flex gap-x-4 pt-6 pb-4 md:pb-8 flex-wrap justify-center gap-y-4'>
					<li
						className='group'
						tw='flex items-center cursor-pointer'
						onClick={() =>
							setParedownStep((prevState) => {
								return { ...prevState, active: 1 };
							})
						}
					>
						<span css={[paredownStep.done.indexOf(1) > -1 || paredownStep.active === 1 ? stepIcon : nextStepIcon]}>
							{paredownStep.done.indexOf(1) > -1 && paredownStep.active !== 1 ? (
								<Icons.Check iconStyle={tw`w-4 h-4 sm:w-6 sm:h-6`} />
							) : (
								'1'
							)}
						</span>
						<span css={[paredownStep.done.indexOf(1) > -1 || paredownStep.active === 1 ? stepText : nextStepText]}>
							Details
						</span>
					</li>
					<li tw='inline border-b-2 border-bgray-lightest flex-grow mb-3' />
					<li
						className='group'
						tw='flex items-center  cursor-pointer'
						onClick={() =>
							setParedownStep((prevState) => {
								return { ...prevState, active: 2 };
							})
						}
					>
						<span css={[paredownStep.done.indexOf(2) > -1 || paredownStep.active === 2 ? stepIcon : nextStepIcon]}>
							{paredownStep.done.indexOf(2) > -1 && paredownStep.active !== 2 ? (
								<Icons.Check iconStyle={tw`w-4 h-4 sm:w-6 sm:h-6`} />
							) : (
								'2'
							)}
						</span>
						<span css={[paredownStep.done.indexOf(2) > -1 || paredownStep.active === 2 ? stepText : nextStepText]}>
							Tracklist
						</span>
					</li>
					<li tw='inline border-b-2 border-bgray-lightest flex-grow mb-3' />
					<li
						className='group'
						tw='flex items-center cursor-pointer'
						onClick={() =>
							setParedownStep((prevState) => {
								return { ...prevState, active: 3 };
							})
						}
					>
						<span css={[paredownStep.done.indexOf(3) > -1 || paredownStep.active === 3 ? stepIcon : nextStepIcon]}>
							{paredownStep.done.indexOf(3) > -1 ? <Icons.Check iconStyle={tw`w-4 h-4 sm:w-6 sm:h-6`} /> : '3'}
						</span>
						<span css={[paredownStep.done.indexOf(3) > -1 || paredownStep.active === 3 ? stepText : nextStepText]}>
							Pare Down
						</span>
					</li>
				</ul>
				{paredownStep.active === 1 && (
					<Details paredownDetails={paredownDetails} setParedownDetails={setParedownDetails} />
				)}
				{paredownStep.active === 2 && (
					<Tracklist
						paredownDetails={paredownDetails}
						setParedownDetails={setParedownDetails}
						playlistId={playlistId}
					/>
				)}
				{paredownStep.active === 3 && (
					<Summary paredownDetails={paredownDetails} playlist={playlist} paredownStep={paredownStep} />
				)}
			</div>
		</Modal>
	);
};
export default ParedownPlaylist;
