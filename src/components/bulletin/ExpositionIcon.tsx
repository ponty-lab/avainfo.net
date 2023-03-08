import { TAspect } from "../../models";
import {
  AvalancheImgContainer,
  AvalancheImg,
} from "../../styles/sidebar.style";
import { Exposition } from "../../utils/exposition.constants";

type Props = {
  aspects: TAspect[] | undefined;
  size: string;
};

const ExpositionIcon = ({ aspects, size }: Props) => {
  if (!aspects) {
    return null;
  }

  const images = Array.from(
    aspects.map((aspect, index) => {
      return (
        <AvalancheImg
          key={`aspect_${index}`}
          src={Exposition[aspect].uri}
          width={size}
          height={size}
          position="absolute"
        />
      );
    })
  );

  return (
    <AvalancheImgContainer size={size}>
      {[...images]}
      <AvalancheImg
        src={Exposition.BG.uri}
        height={size}
        width={size}
        position="absolute"
      />
    </AvalancheImgContainer>
  );
};

export default ExpositionIcon;
