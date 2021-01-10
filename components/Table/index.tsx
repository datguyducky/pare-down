import 'twin.macro';
import { TableRow } from './TableRow';

export const Table: React.FC = () => {
	return (
		<table tw='w-full text-left'>
			<thead tw='text-white text-opacity-70 leading-loose tracking-wider uppercase text-xs border-b border-bgray-lightest border-opacity-50'>
				<tr>
					<th tw='font-normal pb-3 px-6'>Title</th>
					<th tw='font-normal pb-3'>Artist</th>
					<th tw='font-normal pb-3'>Album</th>
					<th tw='font-normal pb-3'>
						<svg tw='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
							/>
						</svg>
					</th>
					<th tw='font-normal pb-2'>
						<svg tw='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
					</th>
				</tr>
			</thead>
			<tbody>
				<TableRow />
			</tbody>
		</table>
	);
};
