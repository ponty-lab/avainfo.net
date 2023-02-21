import { TAspect } from "../models";
import { AvalancheContainer, AvalancheImg } from "../styles/sidebar.style";
import { Exposition } from "../utils";

type Props = {
  aspects: TAspect[];
  size: string;
};

export const ExpositionIcon = ({ aspects, size }: Props) => {
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
          position={"absolute"}
        />
      );
    })
  );

  return (
    <AvalancheContainer size={size}>
      {[...images]}
      <AvalancheImg
        src={Exposition.BG.uri}
        height={size}
        width={size}
        position={"absolute"}
      />
    </AvalancheContainer>
  );
};
