import styled from 'styled-components';

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
