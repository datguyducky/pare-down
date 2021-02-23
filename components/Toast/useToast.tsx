import { useContext } from 'react';
import ToastContext from './context';

// TODO: proper type
//eslint-disable-next-line
function useToast() {
	const context = useContext(ToastContext);

	return { add: context.add, remove: context.remove };
}

export default useToast;
