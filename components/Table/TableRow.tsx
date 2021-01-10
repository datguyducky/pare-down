import 'twin.macro';

export const TableRow: React.FC = () => {
	return (
		<tr tw='border-b border-bgray-lightest border-opacity-50'>
			<td tw='py-3 px-6'>a</td>
			<td tw='py-3'>b</td>
			<td tw='py-3'>c</td>
			<td tw='py-3'>d</td>
			<td tw='py-3'>e</td>
		</tr>
	);
};
