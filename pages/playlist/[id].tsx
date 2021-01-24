import { FC, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import 'twin.macro';
import { HeaderConstant, TracksTable, SimpleModal, Popup, PareDownModal } from '@/components';
import { UsePlaylistDetails, UseUser } from 'data';
import axios from 'axios';
import { mutate } from 'swr';

const PlaylistDetailsView: FC = () => {
	const [displayPDModal, setDisplayPDModal] = useState<boolean>(false);
	const [displayEditModal, setDisplayEditModal] = useState<boolean>(false);
	const [displayDeletePopup, setDisplayDeletePopup] = useState<boolean>(false);

	const router = useRouter();
	const { id } = router.query;

	// check if the user is logged in
	const { data: user, isError: userIsError } = UseUser();
	useEffect(() => {
		if (userIsError) {
			router.replace('/api/login');
		}
	});

	// TODO: right now it's a little bit buggy with passing the ID router query prop, test how it would work with the Nextjs
	// getInitialProps or something like that
	const { data: playlist, isError: playlistDetailsIsError } = UsePlaylistDetails(id);
	const isPlaylistOwner = user?.id === playlist?.owner?.id ? true : false;

	const [playlistName, setPlaylistName] = useState<string>(null);
	const [playlistDesc, setPlaylistDesc] = useState<string>(null);
	const [playlistIsPublic, setPlaylistIsPublic] = useState<boolean>(null);
	const [playlistSongsNum, setPlaylistSongsNum] = useState<number>(0);

	const [paredownStep, setParedownStep] = useState<number>(1);

	useEffect(() => {
		if (playlist) {
			// save playlist data to states (used by inputs)
			// TODO: find if there's a better way to do this
			setPlaylistName(playlist?.name);
			setPlaylistDesc(playlist?.description);
			setPlaylistIsPublic(playlist?.public);
		}
	}, [playlist]);

	function handlePlaylistUnfollow() {
		axios
			.delete(`/api/playlists/${playlist?.id}`)
			.then((response) => {
				if (response.status === 204) {
					// TODO: add timeout and toast here
					router.push(`/dashboard`);
				}
			})
			.catch((error) => {
				//TODO: toast here
				setDisplayDeletePopup(false); // hide popup just because why not
				console.log(error);
			});
	}

	function handlePlaylistEdit() {
		axios
			.put(`/api/playlists/${playlist?.id}`, {
				data: {
					name: playlistName,
					isPublic: playlistIsPublic,
					description: playlistDesc,
				},
			})
			.then((response) => {
				if (response.status === 200) {
					setDisplayEditModal(false);
					mutate(`/api/playlists/${playlist?.id}`);
				}
			})
			.catch((error) => {
				//TODO: toast here
				console.log(error);
			});
	}

	return (
		<div tw='text-white bg-bgray-light w-full min-h-screen'>
			<HeaderConstant href='/dashboard' text='Go Back'>
				<div tw='flex'>
					{playlist?.image ? (
						<img tw='w-24 h-24 rounded ' src={playlist.image} />
					) : playlist?.image === null ? (
						<div tw='w-24 h-24 rounded bg-bgray-light' />
					) : (
						<div tw='w-24 h-24 rounded animate-pulse bg-bgray-light' />
					)}
					<div tw='flex flex-col ml-4 max-w-2xl'>
						<h3 tw='text-2xl font-bold leading-8 text-bblue truncate'>
							{playlist?.name || <span tw='bg-bgray-light w-32 mx-1 inline-block h-5 rounded-sm animate-pulse' />}
						</h3>
						<ul tw='flex text-bblue text-opacity-90 font-semibold text-sm tracking-tighter'>
							<li>Created by: {playlist?.owner?.display_name}</li>
							<li tw='mx-1'>•</li>
							<li>
								{playlist?.tracksTotal} {playlist?.tracksTotal === 1 ? 'track' : 'tracks'}
							</li>
							<li tw='mx-1'>•</li>
							<li>
								{playlist?.followersNum} {playlist?.followersNum === 1 ? 'follower' : 'followers'}
							</li>
							<li tw='mx-1'>•</li>
							<li>{playlist?.public ? 'Public' : 'Private'}</li>
						</ul>
						<p tw='mt-2 break-words break-all leading-snug'> {playlist?.description}</p>
					</div>
				</div>

				<div tw='my-3'>
					<h1 tw='text-sm text-white text-opacity-60 font-bold'>
						Make sure you have selected the correct playlist, then click one of the buttons below to continue.
					</h1>
				</div>

				<div tw='flex'>
					{playlist?.tracksTotal > 0 && (
						<button
							tw='bg-bblue text-sm font-semibold py-1 px-4 rounded-sm mr-4 shadow-md hover:bg-bblue-dark flex items-center justify-center'
							onClick={() => setDisplayPDModal(true)}
						>
							<svg
								tw='w-5 h-5 inline-block mr-2'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z' />
								<path d='M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z' />
							</svg>
							<span>Pare Down</span>
						</button>
					)}
					{isPlaylistOwner && (
						<button
							tw='bg-bgray-darkest text-sm font-semibold py-1 px-4 rounded-sm mr-4 shadow-md hover:bg-opacity-75 flex items-center justify-center'
							onClick={() => setDisplayEditModal(true)}
						>
							<svg
								tw='w-4 h-4 inline-block mr-2'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
								<path
									fillRule='evenodd'
									d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
									clipRule='evenodd'
								/>
							</svg>
							<span>Edit</span>
						</button>
					)}
					<button
						tw='bg-bgray-darkest text-sm font-semibold py-1 px-4 rounded-sm shadow-md hover:bg-opacity-75 flex items-center justify-center'
						onClick={() => setDisplayDeletePopup(true)}
					>
						{isPlaylistOwner ? (
							<>
								<svg
									tw='w-4 h-4 inline-block mr-2'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
										clipRule='evenodd'
									/>
								</svg>
								<span>Delete</span>
							</>
						) : (
							<>
								<svg
									tw='w-4 h-4 inline-block mr-2'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z'
										clipRule='evenodd'
									/>
								</svg>
								<span>Unfollow</span>
							</>
						)}
					</button>
				</div>
			</HeaderConstant>
			<div tw='lg:px-80 lg:mx-2 flex flex-wrap flex-none gap-5 justify-center pb-10'>
				{playlist?.tracksTotal > 0 ? (
					<TracksTable playlistId={id} tracksTotal={playlist?.tracksTotal} />
				) : (
					<h2 tw='font-bold text-xl text-gray-300'>Sorry, it looks like this playlist is empty. 🧐</h2>
				)}
			</div>

			{displayPDModal && (
				<PareDownModal
					paredownStep={paredownStep}
					setParedownStep={setParedownStep}
					image={playlist?.image}
					playlistName={playlistName}
					playlistDesc={playlistDesc}
					playlistIsPublic={playlistIsPublic}
					setPlaylistName={setPlaylistName}
					setPlaylistDesc={setPlaylistDesc}
					setPlaylistIsPublic={setPlaylistIsPublic}
					displayPDModal={displayPDModal}
					setDisplayPDModal={setDisplayPDModal}
					fullWidthAction={() => {
						paredownStep === 3
							? console.log('boom')
							: paredownStep < 3 && paredownStep >= 1
							? setParedownStep((paredownStep) => paredownStep + 1)
							: setParedownStep((paredownStep) => paredownStep - 1);
					}}
					playlistSongsNum={playlistSongsNum}
					setPlaylistSongsNum={setPlaylistSongsNum}
					playlistId={playlist?.id}
				/>
			)}

			{displayEditModal && (
				<SimpleModal
					onClose={() => setDisplayEditModal(false)}
					title='Edit Playlist Details'
					acceptText='Save'
					acceptAction={handlePlaylistEdit}
					isOpen={displayEditModal}
				>
					<EditModal
						image={playlist?.image}
						playlistName={playlistName}
						playlistDesc={playlistDesc}
						playlistIsPublic={playlistIsPublic}
						setPlaylistName={setPlaylistName}
						setPlaylistDesc={setPlaylistDesc}
						setPlaylistIsPublic={setPlaylistIsPublic}
					/>
				</SimpleModal>
			)}

			{displayDeletePopup && (
				<Popup
					title='Remove playlist from your library?'
					onClose={() => setDisplayDeletePopup(false)}
					isOpen={displayDeletePopup}
					cancelText='Cancel'
					cancelAction={() => setDisplayDeletePopup(false)}
					acceptText='Remove'
					acceptAction={handlePlaylistUnfollow}
				>
					<p>
						Are you sure you want to <em tw='not-italic font-semibold text-bblue-light'>permanently remove</em>{' '}
						{playlist?.name} playlist from your library?
					</p>
				</Popup>
			)}
		</div>
	);
};

export default PlaylistDetailsView;

const EditModal: FC<{
	image: string;
	playlistName: string;
	setPlaylistName: Dispatch<SetStateAction<string>>;
	playlistDesc: string;
	setPlaylistDesc: Dispatch<SetStateAction<string>>;
	playlistIsPublic: boolean;
	setPlaylistIsPublic: Dispatch<SetStateAction<boolean>>;
}> = ({
	image,
	playlistName,
	setPlaylistName,
	playlistDesc,
	setPlaylistDesc,
	playlistIsPublic,
	setPlaylistIsPublic,
}) => {
	return (
		<div tw='grid grid-cols-3 col-gap-5 row-gap-5'>
			{image ? (
				<img src={image} alt='Playlist cover image' />
			) : (
				<div tw='w-full rounded bg-bgray' style={{ minHeight: 190 }} />
			)}
			<div tw='col-span-2 flex flex-col'>
				<label htmlFor='playlist-name' tw='text-sm mb-0.5 font-semibold text-white text-opacity-70'>
					Name
				</label>
				<input
					id='playlist-name'
					type='text'
					tw='text-black rounded-sm px-2 py-0.5 mb-4'
					value={playlistName}
					onChange={(e) => setPlaylistName(e.target.value)}
				/>
				<label htmlFor='playlist-description' tw='text-sm mb-0.5 font-semibold text-white text-opacity-70'>
					Description
				</label>
				<textarea
					tw='h-full text-black py-0.5 px-2 resize-none'
					value={playlistDesc}
					placeholder='Give your playlist a catchy description'
					maxLength={300}
					onChange={(e) => setPlaylistDesc(e.target.value)}
				/>
			</div>
			<div tw='col-span-3 ml-auto'>
				<label
					htmlFor='playlist-ispublic'
					tw='flex items-center text-sm mb-0.5 font-semibold text-white text-opacity-70'
				>
					<input
						type='checkbox'
						id='playlist-ispublic'
						checked={playlistIsPublic}
						onChange={(e) => setPlaylistIsPublic(e.target.checked)}
						tw='mr-2'
					/>
					Public playlist
				</label>
			</div>
		</div>
	);
};
