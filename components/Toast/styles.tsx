import tw, { styled } from 'twin.macro';

export const ToastContent = styled.div<{ appearance?: string }>(({ appearance }) => [
	tw`w-full h-11 py-2 overflow-hidden relative flex items-center justify-center bg-green-500`,
	appearance === 'success' && tw`bg-green-500`,
	appearance === 'warning' && tw`bg-yellow-500`,
	appearance === 'error' && tw`bg-red-500`,
	appearance === 'info' && tw`bg-bblue`,
]);
