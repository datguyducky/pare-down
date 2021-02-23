import { FC, Dispatch, SetStateAction, useState } from 'react';
import { SimpleModal } from '@/components';
import { UsePlaylistDetailsType } from '../../data/types';
import 'twin.macro';
import axios from 'axios';
import { mutate } from 'swr';
import { useToast } from '@/toast';

export interface EditDetails {
	name: string;
	isPublic: boolean;
	description: string;
}

// TODO: fix XML Parsing Error: no root element found Location: host:/api/playlists/[:id]
const EditPlaylist: FC<{
	playlist: UsePlaylistDetailsType['data'];
	setDisplayEditModal: Dispatch<SetStateAction<boolean>>;
	displayEditModal: boolean;
}> = ({ playlist, setDisplayEditModal, displayEditModal }) => {
	const [editDetails, setEditDetails] = useState<EditDetails>({
		name: playlist.name,
		description: playlist.description,
		isPublic: playlist.public,
	});

	const toast = useToast();

	function handlePlaylistEdit() {
		axios
			.put(`/api/playlists/${playlist?.id}`, {
				data: editDetails,
			})
			.then((response) => {
				if (response.status === 200) {
					setDisplayEditModal(false);
					toast.add({ message: 'The playlist has been successfully edited' });

					mutate(`/api/playlists/${playlist?.id}`);
				}
			})
			.catch((error) => {
				toast.add({ message: 'Sorry, something went wrong: ' + error.response?.data?.message, appearance: 'error' });
				console.log(error.response?.data);
			});
	}

	return (
		<SimpleModal
			onClose={() => setDisplayEditModal(false)}
			title='Edit Playlist Details'
			acceptText='Save'
			acceptAction={handlePlaylistEdit}
			isOpen={displayEditModal}
		>
			<div tw='sm:grid sm:grid-cols-3 sm:col-gap-5 sm:row-gap-5 flex flex-col'>
				{playlist.image ? (
					<img
						src={playlist.image}
						alt='Playlist cover image'
						tw='flex-grow-0 w-36 h-36 sm:h-full sm:w-full mx-auto sm:mx-0'
					/>
				) : (
					<div tw='sm:w-full rounded bg-bgray w-36 h-36! sm:h-full sm:w-full sm:min-h-cover mx-auto sm:mx-0' />
				)}
				<div tw='sm:col-span-2 flex flex-col'>
					<label htmlFor='playlist-name' tw='text-sm mb-0.5 font-semibold text-white text-opacity-70'>
						Name
					</label>
					<input
						id='playlist-name'
						type='text'
						tw='text-black rounded-sm px-2 py-0.5 mb-4'
						value={editDetails.name}
						onChange={(e) => setEditDetails({ ...editDetails, name: e.target.value })}
					/>
					<label htmlFor='playlist-description' tw='text-sm mb-0.5 font-semibold text-white text-opacity-70'>
						Description
					</label>
					<textarea
						tw='h-full text-black py-0.5 px-2 resize-none'
						value={editDetails.description}
						placeholder='Give your playlist a catchy description'
						maxLength={300}
						onChange={(e) =>
							setEditDetails({ ...editDetails, description: e.target.value.length > 0 ? e.target.value : undefined })
						}
					/>
				</div>
				<div tw='sm:col-span-3 ml-auto mt-2 sm:mt-0'>
					<label
						htmlFor='playlist-ispublic'
						tw='flex items-center text-sm mb-0.5 font-semibold text-white text-opacity-70'
					>
						<input
							type='checkbox'
							id='playlist-ispublic'
							checked={editDetails.isPublic}
							onChange={(e) => setEditDetails({ ...editDetails, isPublic: e.target.checked })}
							tw='mr-2'
						/>
						Public playlist
					</label>
				</div>
			</div>
		</SimpleModal>
	);
};
export default EditPlaylist;
