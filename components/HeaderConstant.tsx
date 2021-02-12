import tw, { styled } from 'twin.macro';
import Link from 'next/link';

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
					<a href='https://github.com/datguysheepy/pare-down' tw='hover:underline'>
						Github
					</a>
				</li>
				<li tw='mx-2 hidden xs:inline'>|</li>
				<li tw='text-gray-400 text-xs hidden xs:inline'>Created with ❤️ by @datguysheepy</li>
			</ul>
			<div tw='flex flex-col'>
				<Link href={href} passHref>
					<a tw='flex items-center text-sm font-bold mb-3 underline cursor-pointer opacity-90 hover:opacity-80'>
						<svg tw='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
							<path
								fillRule='evenodd'
								d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
								clipRule='evenodd'
							/>
						</svg>
						<span>{text}</span>
					</a>
				</Link>
				{children}
			</div>
		</StyledHeaderConstant>
	);
};
