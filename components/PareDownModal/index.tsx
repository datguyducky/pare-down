import { FC, Dispatch, SetStateAction } from 'react';
import { Modal, Tracklist, Details } from '@/components';
import 'twin.macro';

const PareDownModal: FC<{
	image: string;
	paredownStep: number;
	setParedownStep: Dispatch<SetStateAction<number>>;
	playlistName: string;
	setPlaylistName: Dispatch<SetStateAction<string>>;
	playlistDesc: string;
	setPlaylistDesc: Dispatch<SetStateAction<string>>;
	playlistIsPublic: boolean;
	setPlaylistIsPublic: Dispatch<SetStateAction<boolean>>;
	setDisplayPDModal: Dispatch<SetStateAction<boolean>>;
	displayPDModal: boolean;
	playlistSongsNum: number;
	setPlaylistSongsNum: Dispatch<SetStateAction<number>>;
	fullWidthAction?: (event: React.MouseEvent<HTMLElement>) => void;
	playlistId: string;
}> = ({
	paredownStep,
	setParedownStep,
	playlistName,
	setPlaylistName,
	playlistDesc,
	setPlaylistDesc,
	playlistIsPublic,
	setPlaylistIsPublic,
	image,
	setDisplayPDModal,
	displayPDModal,
	fullWidthAction,
	playlistSongsNum,
	setPlaylistSongsNum,
	playlistId,
}) => {
	return (
		<Modal
			onClose={() => {
				setDisplayPDModal(false);
				setParedownStep(1);
			}}
			title='Pare Down'
			description='Duplicate your playlist with a pared down number of songs.'
			isOpen={displayPDModal}
			fullWidthAction={fullWidthAction}
			fullWidthText='Save Details'
		>
			<div tw='flex h-full flex-col px-6'>
				<ul tw='flex col-gap-4 pt-6 pb-8'>
					<li tw='flex items-center hover:underline cursor-pointer' onClick={() => setParedownStep(1)}>
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
						<span tw='text-white font-medium'>Details</span>
					</li>
					<li tw='inline border-b-2 border-bgray-lightest flex-grow mb-3' />
					<li tw='flex items-center hover:underline cursor-pointer' onClick={() => setParedownStep(2)}>
						<span tw='bg-bblue rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2 text-white'>2</span>
						<span tw='text-white font-medium'>Tracklist</span>
					</li>
					<li tw='inline border-b-2 border-bgray-lightest flex-grow mb-3' onClick={() => setParedownStep(3)} />
					<li tw='flex items-center hover:underline cursor-pointer'>
						<span tw='bg-bgray-lightest rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2 text-white text-opacity-50'>
							3
						</span>
						<span tw='text-white text-opacity-75'>Pare Down</span>
					</li>
				</ul>
				{paredownStep === 1 && (
					<Details
						playlistName={playlistName}
						setPlaylistName={setPlaylistName}
						playlistDesc={playlistDesc}
						setPlaylistDesc={setPlaylistDesc}
						playlistIsPublic={playlistIsPublic}
						setPlaylistIsPublic={setPlaylistIsPublic}
					/>
				)}
				{paredownStep === 2 && (
					<Tracklist
						playlistSongsNum={playlistSongsNum}
						setPlaylistSongsNum={setPlaylistSongsNum}
						playlistId={playlistId}
					/>
				)}
			</div>
		</Modal>
	);
};
export default PareDownModal;
