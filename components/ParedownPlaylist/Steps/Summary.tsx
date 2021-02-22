import { UsePlaylistDetailsType } from 'data/types';
import { FC } from 'react';
import 'twin.macro';
import { ParedownDetails, ParedownStep } from '../';

const Summary: FC<{
	paredownDetails: ParedownDetails;
	playlist: UsePlaylistDetailsType['data'];
	paredownStep: ParedownStep;
}> = ({ paredownDetails, playlist, paredownStep }) => {
	return (
		<div tw='flex flex-col flex-1'>
			<h2 tw='font-bold mt-1.5 mb-2 text-base text-white text-opacity-70'>Original Playlist</h2>
			<div tw='mb-1.5 flex'>
				{playlist.image ? (
					<img tw='h-24 w-24 md:w-36 md:h-36 rounded flex-shrink-0' src={playlist.image} />
				) : (
					<div tw='rounded bg-bgray h-24 w-24 md:w-36 md:h-36' />
				)}
				<ul tw='px-5 py-1 my-auto w-2/3'>
					<li tw='text-lg font-semibold'>{playlist.name}</li>
					<li tw='break-words truncate whitespace-normal w-full max-h-12'>{playlist.description}</li>

					<li tw='mt-3'>{playlist.tracksTotal} songs</li>
					<li>{playlist.public ? 'Public playlist' : 'Private playlist'}</li>
				</ul>
			</div>

			<h2 tw='font-bold mt-2 md:mt-6 mb-2 text-base text-white text-opacity-70'>Pared Down Playlist</h2>
			<div tw='mb-1.5 flex'>
				{paredownDetails.imgArr ? (
					paredownDetails.imgArr.length > 1 ? (
						<div tw='h-24 w-24 md:w-36 md:h-36 grid grid-cols-2 grid-rows-2 rounded flex-shrink-0  overflow-hidden'>
							{paredownDetails.imgArr.map((img: string, i: number) => (
								<img tw='h-full w-full' src={img} key={i} />
							))}
						</div>
					) : (
						<img tw='h-24 w-24 md:w-36 md:h-36 rounded flex-shrink-0' src={paredownDetails.imgArr[0]} />
					)
				) : (
					<div tw='rounded bg-bgray h-24 w-24 md:w-36 md:h-36' />
				)}

				<ul tw='px-5 py-1 my-auto w-2/3'>
					<li tw='text-lg font-semibold'>{paredownDetails.name}</li>
					<li tw='break-words truncate whitespace-normal w-full max-h-12'>{paredownDetails.description}</li>

					<li tw='mt-3'>{paredownDetails.tracksRealTotal} songs</li>
					<li>{paredownDetails.public ? 'Public playlist' : 'Private playlist'}</li>
				</ul>
			</div>

			{[1, 2].every((val) => paredownStep.done.includes(val)) ? null : (
				<p tw='mt-auto mb-4 text-center text-lg font-bold text-bblue leading-none md:leading-7 2xl:w-7/12 lg:mx-auto'>
					Complete both the step 1 and 2 to be able to Pare Down the playlist
				</p>
			)}
		</div>
	);
};
export default Summary;
