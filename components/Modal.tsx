import { Icons } from '@/icons';
import { Dispatch, SetStateAction, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import ClientOnlyPortal from './ClientOnlyPortal';

const ModalContent = styled.div(() => [
	`
		width: 100vw;
		height: 100vh;
		@media (min-width: 640px) {
			width: 35vw;
			height: 78vh;
			min-width: 520px;
			max-width: 720px;
		}
	`,
	tw`bg-bgray-light rounded-md overflow-y-auto relative flex flex-col`,
]);

interface ModalType {
	title: string;
	onClose: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	description?: string;
	fullWidthText?: string;
	fullWidthAction?: (event: React.MouseEvent<HTMLElement>) => void;
	acceptText?: string;
	acceptAction?: (event: React.MouseEvent<HTMLElement>) => void;
	cancelText?: string;
	cancelAction?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Modal: React.FC<ModalType> = ({
	title,
	description,
	onClose,
	isOpen,
	children,
	fullWidthText,
	fullWidthAction,
	acceptText,
	acceptAction,
	cancelText,
	cancelAction,
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
				<ModalContent onClick={(e) => e.stopPropagation()}>
					<div tw='bg-bgray p-5 relative shadow-md border-b border-bgray-dark border-opacity-50'>
						<h2 tw='text-xl font-bold leading-relaxed tracking-wide'>{title}</h2>
						<p tw='tracking-wide text-white text-opacity-70 text-sm'>{description}</p>

						<button
							tw='absolute top-0 right-0 my-2 mx-2 text-white text-opacity-80 hover:text-opacity-100'
							onClick={() => onClose(false)}
						>
							<Icons.Close iconStyle={tw`h-5 w-5`} />
						</button>
					</div>
					<div tw='py-3 px-5 flex-1'>{children}</div>
					<div tw='mt-auto'>
						{fullWidthText && fullWidthAction && !acceptText && !cancelText && (
							<button tw='text-center w-full py-3 bg-bblue font-bold text-lg' onClick={fullWidthAction}>
								{fullWidthText}
							</button>
						)}
						{acceptText || cancelText ? (
							<div tw='ml-auto flex max-w-max py-3 px-5'>
								{cancelText && cancelAction && (
									<button tw='text-lg font-bold text-white text-opacity-60 hover:text-opacity-100'>{cancelText}</button>
								)}
								{acceptText && acceptAction && <button tw='ml-6 text-lg font-bold'>{acceptText}</button>}
							</div>
						) : null}
					</div>
				</ModalContent>
			</div>
		</ClientOnlyPortal>
	);
};
