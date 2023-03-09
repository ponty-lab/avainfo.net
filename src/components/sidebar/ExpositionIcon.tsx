import { TAspect } from "../../models";
import { ImgContainer } from "../../styles/pages.style";
import { Exposition } from "./exposition.constants";

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
        <img
          key={`aspect_${index}`}
          src={Exposition[aspect].uri}
          width={size}
          height={size}
          style={{ position: "absolute" }}
        />
      );
    })
  );

  return (
    <ImgContainer size={size}>
      {[...images]}
      <img
        src={Exposition.BG.uri}
        height={size}
        width={size}
        style={{ position: "absolute" }}
      />
    </ImgContainer>
  );
};

export default ExpositionIcon;
