import { useRef, useEffect, useState, FC } from 'react';
import { createPortal } from 'react-dom';

export const ClientOnlyPortal: FC<{ selector: string }> = ({ children, selector }) => {
	const ref = useRef();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		console.log(selector);
		ref.current = document.querySelector(selector);
		setMounted(true);
	}, [selector]);

	return mounted ? createPortal(children, ref.current) : null;
};
export default ClientOnlyPortal;
