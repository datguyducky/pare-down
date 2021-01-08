import tw, { styled } from 'twin.macro';
import Link from 'next/link';

interface HeaderConstantTypes {
	image: string;
	name: string;
}

const StyledPlaylistCard = styled.div<{ image: string }>`
	width: 180px;
	height: 180px;
	background-image: url('${(p) => p.image}');
	${tw`bg-bgray-light relative cursor-pointer rounded bg-no-repeat bg-center hover:shadow-inner hover:shadow-lg bg-cover`};
`;

const PlaylistName = styled.span`
	text-shadow: rgb(0, 0, 0) 0px 2px 2px;
	width: 160px;
	${tw`font-bold truncate text-white text-lg absolute top-0 right-0 left-0 text-right mx-2 mt-3 inline-block`}
`;

export const PlaylistCard: React.FC<HeaderConstantTypes> = ({ image, name }) => {
	return (
		<StyledPlaylistCard image={image}>
			<PlaylistName>{name}</PlaylistName>
		</StyledPlaylistCard>
	);
};
