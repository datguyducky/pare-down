import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledHeroSVG = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
	transform: rotate(180deg);

	& > svg {
		position: relative;
		display: block;
		width: calc(300% + 1.3px);
		height: 150px;
	}

	.shape-fill {
		fill: #fff;
	}
`;

export const stepIcon = tw`bg-bblue rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2 text-white`;
export const stepText = tw`text-white font-medium group-hover:underline`;
export const nextStepIcon = tw`bg-bgray-lightest rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2 text-white text-opacity-50`;
export const nextStepText = tw`text-white text-opacity-75 group-hover:underline`;
