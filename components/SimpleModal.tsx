import { Icons } from '@/icons';
import { Dispatch, SetStateAction, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import ClientOnlyPortal from './ClientOnlyPortal';

const SimpleModalContent = styled.div(() => [
	`
		width: 100vw;
		height: 100vh;
		@media (min-width: 640px) {
			width: 34vw;
			height: 360px;
			min-width: 520px;
			max-width: 720px;
		}
	`,
	tw`bg-bgray-light rounded-md overflow-hidden relative flex flex-col`,
]);

interface SimpleModalType {
	title: string;
	onClose: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	acceptText?: string;
	acceptAction?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const SimpleModal: React.FC<SimpleModalType> = ({
	title,
	onClose,
	children,
	acceptText,
	acceptAction,
	isOpen,
}) => {
	const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
		if (e.code === 'Escape') {
			onClose(false);
		}
	};

	useEffect(() => {
		document.body.addEventListener('keydown', closeOnEscapeKeyDown);

		return () => document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		// disabe scroll for the whole page when Modal is opened (but still display the scrollbar)
		const withScroll = document.body.scrollHeight > document.documentElement.clientHeight;
		document.body.style.top = `-${window.scrollY}px`;
		document.body.style.overflowY = withScroll ? 'scroll' : 'unset';
		document.body.style.position = 'fixed';
		document.body.style.width = '100%';

		// re-enable scroll for the whole page when Modal is about to be unmounted
		return () => {
			const scrollY = document.body.style.top;
			document.body.style.overflow = 'auto';
			document.body.style.position = 'unset';
			window.scrollTo(0, parseInt(scrollY || '0') * -1);
		};
	}, []);

	if (!isOpen) {
		return null;
	}

	return (
		<ClientOnlyPortal selector='#__next'>
			<div
				tw='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white'
				onClick={() => onClose(false)}
			>
				<SimpleModalContent onClick={(e) => e.stopPropagation()}>
					<div tw='px-5 py-3 relative flex items-center justify-center'>
						<h2 tw='text-xl font-bold leading-relaxed'>{title}</h2>

						<button
							tw='absolute right-0 mx-5 text-white text-opacity-80 hover:text-opacity-100'
							onClick={() => onClose(false)}
						>
							<Icons.Close iconStyle={tw`h-5 w-5`} />
						</button>
					</div>
					<div tw='px-5 overflow-hidden'>{children}</div>
					<div tw='mb-auto mt-3 flex justify-center pb-2 sm:my-auto'>
						{acceptText && acceptAction ? (
							<button
								tw='tracking-wider font-bold bg-bblue rounded-sm px-5 py-0.5 hover:bg-bblue-dark'
								onClick={acceptAction}
							>
								{acceptText}
							</button>
						) : null}
					</div>
				</SimpleModalContent>
			</div>
		</ClientOnlyPortal>
	);
};
