import tw, { styled } from 'twin.macro';
import { useRouter } from 'next/router';

interface HeaderConstantTypes {
	image: string;
	name: string;
	id: string;
}

const StyledPlaylistCard = styled.div<{ image: string }>(({ image }) => [
	`
		width: 180px; 	
		height: 180px; 
	`,
	tw`bg-bgray-light relative cursor-pointer rounded bg-no-repeat bg-center hover:shadow-inner hover:shadow-lg bg-cover hover:opacity-95`,
	image ? `background-image: url('${image}')` : tw`bg-bgray-darkest`,
]);

const PlaylistName = styled.span`
	text-shadow: rgb(0, 0, 0) 0px 2px 2px;
	width: 160px;
	${tw`font-bold truncate text-white text-lg absolute top-0 right-0 left-0 text-right mx-2 mt-3 inline-block`}
`;

export const PlaylistCard: React.FC<HeaderConstantTypes> = ({ image, name, id }) => {
	const router = useRouter();
	return (
		<StyledPlaylistCard image={image} onClick={() => router.push(`/playlist/${id}`)}>
			<PlaylistName>{name}</PlaylistName>
		</StyledPlaylistCard>
	);
};
