import 'twin.macro';
import ClientOnlyPortal from 'components/ClientOnlyPortal';
import { useState, useMemo, ElementType } from 'react';

import ToastContext from './context';
import Toast from './Toast';

type ToastType = {
	message: string;
	id: string;
	appearance: string;
};

// Create a random ID
function generateUEID() {
	let first: number | string = (Math.random() * 46656) | 0;
	let second: number | string = (Math.random() * 46656) | 0;
	first = ('000' + first.toString(36)).slice(-3);
	second = ('000' + second.toString(36)).slice(-3);

	return first + second;
}

function withToastProvider(Component: ElementType): unknown {
	function WithToastProvider(props) {
		const [toast, setToast] = useState<ToastType>(null);
		const add = (content: ToastType) => {
			const message = content.message;
			const id = generateUEID();
			const appearance = content.appearance || 'success';

			setToast({ id, message, appearance });
		};
		const remove = () => setToast(null);
		const providerValue = useMemo(() => {
			return { add, remove };
			//eslint-disable-next-line
		}, [toast]);

		return (
			<ToastContext.Provider value={providerValue}>
				<Component {...props} />

				<ClientOnlyPortal selector='#__next'>
					{toast && (
						<div tw='fixed inset-0 bg-black bg-opacity-60 flex text-white z-50' onClick={() => remove()}>
							{' '}
							<Toast message={toast.message} key={toast.id} remove={() => remove()} appearance={toast.appearance} />
						</div>
					)}
				</ClientOnlyPortal>
			</ToastContext.Provider>
		);
	}

	return WithToastProvider;
}

export default withToastProvider;
