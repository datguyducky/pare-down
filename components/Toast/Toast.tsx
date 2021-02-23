import React, { useRef, FC, useEffect } from 'react';
import { ToastContent } from './styles';
import 'twin.macro';

const Toast: FC<{ remove: () => void; message: string; appearance: string }> = ({ message, remove, appearance }) => {
	const removeRef = useRef(null);
	removeRef.current = remove;

	useEffect(() => {
		const duration = 2800;
		const id = setTimeout(() => removeRef.current(), duration);

		return () => clearTimeout(id);
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

	useEffect(() => {
		document.body.addEventListener('keydown', closeOnEscapeKeyDown);
		return () => document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
		//eslint-disable-next-line
	}, []);

	const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
		if (e.code === 'Escape') {
			remove();
		}
	};

	return (
		<ToastContent onClick={(e) => e.stopPropagation()} appearance={appearance}>
			<p tw='font-bold text-center text-base xs:text-lg tracking-wide'>{message}</p>
			<button tw='absolute right-0 mr-4' onClick={() => remove()}>
				<svg tw='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
				</svg>
			</button>
		</ToastContent>
	);
};

export default Toast;
