import { FC, Dispatch, SetStateAction, useState } from 'react';
import { Modal, Tracklist, Details } from '@/components';
import { UsePlaylistDetailsType } from '../../data/types';
import 'twin.macro';

export interface ParedownDetails {
	name: string;
	description: string;
	tracksTotal: number;
	public: boolean;
}

const ParedownPlaylist: FC<{
	playlist: UsePlaylistDetailsType['data'];
	playlistId: string;
	setDisplayPDModal: Dispatch<SetStateAction<boolean>>;
	displayPDModal: boolean;
}> = ({ playlist, playlistId, setDisplayPDModal, displayPDModal }) => {
	const [paredownDetails, setParedownDetails] = useState<ParedownDetails>({
		name: playlist.name,
		description: playlist.description,
		tracksTotal: playlist.tracksTotal,
		public: playlist.public,
	});
	const [paredownStep, setParedownStep] = useState<number>(1);

	return (
		<Modal
			onClose={() => {
				setDisplayPDModal(false);
				setParedownStep(1);
			}}
			title='Pare Down'
			description='Duplicate your playlist with a pared down number of songs.'
			isOpen={displayPDModal}
			fullWidthAction={() => {
				paredownStep === 3
					? console.log('boom', paredownDetails)
					: paredownStep < 3 && paredownStep >= 1
					? setParedownStep((paredownStep) => paredownStep + 1)
					: setParedownStep((paredownStep) => paredownStep - 1);
			}}
			fullWidthText='Save Details'
		>
			<div tw='flex h-full flex-col px-6'>
				<ul tw='flex col-gap-4 pt-6 pb-8'>
					<li tw='flex items-center cursor-pointer' onClick={() => setParedownStep(1)}>
						<span tw='bg-bblue rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2 text-white'>
							<svg
								tw='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
							</svg>
						</span>
						<span tw='text-white font-medium hover:underline'>Details</span>
					</li>
					<li tw='inline border-b-2 border-bgray-lightest flex-grow mb-3' />
					<li tw='flex items-center  cursor-pointer' onClick={() => setParedownStep(2)}>
						<span tw='bg-bblue rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2 text-white'>2</span>
						<span tw='text-white font-medium hover:underline'>Tracklist</span>
					</li>
					<li tw='inline border-b-2 border-bgray-lightest flex-grow mb-3' onClick={() => setParedownStep(3)} />
					<li tw='flex items-center cursor-pointer'>
						<span tw='bg-bgray-lightest rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2 text-white text-opacity-50'>
							3
						</span>
						<span tw='text-white text-opacity-75 hover:underline'>Pare Down</span>
					</li>
				</ul>
				{paredownStep === 1 && <Details paredownDetails={paredownDetails} setParedownDetails={setParedownDetails} />}
				{paredownStep === 2 && (
					<Tracklist
						paredownDetails={paredownDetails}
						setParedownDetails={setParedownDetails}
						playlistId={playlistId}
					/>
				)}
			</div>
		</Modal>
	);
};
export default ParedownPlaylist;
