import { Dispatch, SetStateAction, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import ClientOnlyPortal from './ClientOnlyPortal';

const PopupContent = styled.div(() => [
	`
		width: 520px;
		max-height: 420px;
	`,
	tw`bg-bgray-light rounded-md overflow-hidden relative flex flex-col`,
]);

interface PopupType {
	title: string;
	onClose: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
	cancelText?: string;
	cancelAction?: (event: React.MouseEvent<HTMLElement>) => void;
	acceptText?: string;
	acceptAction?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Popup: React.FC<PopupType> = ({
	title,
	onClose,
	cancelText,
	cancelAction,
	acceptText,
	acceptAction,
	isOpen,
	children,
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
		// disabe scroll for the whole page when Popup is opened (but still display the scrollbar)
		const withScroll = document.body.scrollHeight > document.documentElement.clientHeight;
		document.body.style.top = `-${window.scrollY}px`;
		document.body.style.overflowY = withScroll ? 'scroll' : 'unset';
		document.body.style.position = 'fixed';
		document.body.style.width = '100%';

		// re-enable scroll for the whole page when Popup is about to be unmounted
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
				<PopupContent onClick={(e) => e.stopPropagation()}>
					<div tw='px-5 py-3 relative flex'>
						<h2 tw='text-xl font-bold leading-relaxed'>{title}</h2>

						<button tw='ml-auto text-white text-opacity-80 hover:text-opacity-100' onClick={() => onClose(false)}>
							<svg
								tw='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
							</svg>
						</button>
					</div>
					<div tw='px-5'>{children}</div>
					<div tw='my-auto ml-auto flex py-3 px-5'>
						{cancelText && cancelAction ? (
							<button
								tw='tracking-wider rounded-sm px-5 py-0.5 font-bold text-white text-opacity-70'
								onClick={cancelAction}
							>
								{cancelText}
							</button>
						) : null}
						{acceptText && acceptAction ? (
							<button
								tw='tracking-wider font-bold bg-bblue rounded-sm px-5 py-0.5 hover:bg-bblue-dark ml-2'
								onClick={acceptAction}
							>
								{acceptText}
							</button>
						) : null}
					</div>
				</PopupContent>
			</div>
		</ClientOnlyPortal>
	);
};
