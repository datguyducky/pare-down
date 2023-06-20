import tw, { styled } from 'twin.macro';
import Link from 'next/link';

import { Icons } from '@/icons';

interface HeaderConstantTypes {
	href: string;
	text: string;
}

const StyledHeaderConstant = styled.div`
	${tw`mb-10 bg-bgray px-8 py-10 3xl:px-96 lg:py-20 shadow-md relative`}
`;

export const HeaderConstant: React.FC<HeaderConstantTypes> = ({ href, text, children }) => {
	return (
		<StyledHeaderConstant>
			<ul tw='absolute top-0 pt-3 px-8 right-0 opacity-90 text-sm font-bold flex items-center'>
				<li>
					<a href='https://github.com/datguyducky/pare-down' tw='hover:underline'>
						Github
					</a>
				</li>
				<li tw='mx-2 hidden xs:inline'>|</li>
				<li tw='text-gray-400 text-xs hidden xs:inline'>Created with ❤️ by @datguyducky</li>
			</ul>
			<div tw='flex flex-col'>
				<Link href={href} passHref>
					<a tw='flex items-center text-sm font-bold mb-3 underline cursor-pointer opacity-90 hover:opacity-80'>
						<Icons.ChevronLeft iconStyle={tw`w-5 h-5`} />
						<span>{text}</span>
					</a>
				</Link>
				{children}
			</div>
		</StyledHeaderConstant>
	);
};
