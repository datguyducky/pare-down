import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'twin.macro';
import { HeaderConstant, TracksTable, Modal, SimpleModal, Popup } from '@/components';
import { UsePlaylistDetails, UseUser } from 'data';

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

				<div tw='mt-7 mb-3'>
					<h1 tw='text-sm text-white text-opacity-60 font-bold'>
						Make sure you have selected the correct playlist, then click one of the buttons below to continue.
					</h1>
				</div>

				<div tw='flex'>
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
				{playlist?.tracksTotal && <TracksTable playlistId={id} tracksTotal={playlist?.tracksTotal} />}
			</div>

			{displayPDModal && (
				<Modal
					onClose={() => setDisplayPDModal(false)}
					title='Pare Down'
					description='Duplicate your playlist with a pared down number of songs.'
					isOpen={displayPDModal}
				>
					<PareDownModal />
				</Modal>
			)}

			{displayEditModal && (
				<SimpleModal
					onClose={() => setDisplayEditModal(false)}
					title='Edit Playlist Details'
					acceptText='Save'
					acceptAction={() => console.log('save here')}
					isOpen={displayEditModal}
				>
					<EditModal name={playlist?.name} image={playlist?.image} description={playlist?.description} />
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
					acceptAction={() => console.log('remove handler here')}
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

const PareDownModal: FC = () => {
	return <div>pare down 1 step here...</div>;
};

const EditModal: FC<{ name: string; image: string; description?: string }> = ({ name, image, description }) => {
	const [playlistName, setPlaylistName] = useState<string>(name || null);
	const [playlistDesc, setPlaylistDesc] = useState<string>(description || undefined);

	return (
		<div tw='grid grid-cols-3 col-gap-5'>
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
				<label htmlFor='playlist-description'>Description</label>
				<textarea
					tw='h-full text-black py-0.5 px-2 resize-none'
					value={playlistDesc}
					placeholder='Give your playlist a catchy description'
					maxLength={300}
				/>
			</div>
		</div>
	);
};
