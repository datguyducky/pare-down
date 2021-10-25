import { Icons } from '@/icons';
import React, { useRef, FC, useEffect } from 'react';
import { ToastContent } from './styles';
import tw from 'twin.macro';

const Toast: FC<{ remove: () => void; message: string; appearance: string }> = ({ message, remove, appearance }) => {
	const removeRef = useRef(null);
	removeRef.current = remove;

	useEffect(() => {
		const id = setTimeout(() => removeRef.current(), 2800);

		return () => clearTimeout(id);
	}, []);

	useEffect(() => {
		// disable scroll for the whole page when Popup is opened (but still display the scrollbar)
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
				<Icons.Close iconStyle={tw`w-5 h-5`} />
			</button>
		</ToastContent>
	);
};

export default Toast;
