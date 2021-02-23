import tw, { styled } from 'twin.macro';
import { useRouter } from 'next/router';

interface HeaderConstantTypes {
	image: string;
	name: string;
	id: string;
}

const StyledPlaylistCard = styled.div<{ image: string }>(({ image }) => [
	`
		width: 110px; 	
		height: 110px;
		@media (min-width: 640px) {
			width: 180px;
			height: 180px;
		}
	`,
	image ? `background: linear-gradient(0deg, #00000072 30%, #ffffff44 100%), url('${image}');` : tw`bg-bgray-darkest`,
	tw`relative cursor-pointer rounded bg-no-repeat bg-center hover:shadow-inner hover:shadow-lg bg-cover hover:opacity-95`,
]);

const PlaylistName = styled.span`
	text-shadow: rgb(0, 0, 0) 0px 2px 2px;
	width: 90px;
	@media (min-width: 640px) {
		width: 160px;
	}
	${tw`font-bold truncate text-white text-sm xl:text-lg absolute bottom-0 right-0 left-0 text-right mx-2 mb-3 inline-block`}
`;

export const PlaylistCard: React.FC<HeaderConstantTypes> = ({ image, name, id }) => {
	const router = useRouter();
	return (
		<StyledPlaylistCard image={image} onClick={() => router.push(`/playlist/${id}`)}>
			<PlaylistName>{name}</PlaylistName>
		</StyledPlaylistCard>
	);
};
