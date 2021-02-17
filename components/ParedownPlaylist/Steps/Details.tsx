import { FC, Dispatch, SetStateAction } from 'react';
import 'twin.macro';
import { ParedownDetails } from '../';

const Details: FC<{
	paredownDetails: ParedownDetails;
	setParedownDetails: Dispatch<SetStateAction<ParedownDetails>>;
}> = ({ paredownDetails, setParedownDetails }) => {
	return (
		<div tw='flex flex-col'>
			<label htmlFor='playlist-name' tw='text-sm mb-0.5 font-semibold text-white text-opacity-70'>
				Name
			</label>
			<input
				id='playlist-name'
				type='text'
				tw='text-black rounded-sm px-2 py-0.5 mb-6'
				value={paredownDetails.name}
				onChange={(e) => setParedownDetails({ ...paredownDetails, name: e.target.value })}
			/>
			<label htmlFor='playlist-description' tw='text-sm mb-0.5 font-semibold text-white text-opacity-70'>
				Description
			</label>
			<textarea
				tw='h-full text-black py-0.5 px-2 resize-none mb-6'
				value={paredownDetails.description}
				placeholder='Give your playlist a catchy description'
				maxLength={300}
				onChange={(e) => setParedownDetails({ ...paredownDetails, description: e.target.value })}
			/>
			<label tw='text-sm mb-0.5 font-semibold text-white text-opacity-70'>Other Options</label>
			<label htmlFor='playlist-ispublic' tw='flex items-center text-sm mb-0.5 font-semibold'>
				<input
					type='checkbox'
					id='playlist-ispublic'
					checked={paredownDetails.public}
					onChange={(e) => setParedownDetails({ ...paredownDetails, public: e.target.checked })}
					tw='mr-2'
				/>
				Public playlist
			</label>
		</div>
	);
};
export default Details;
