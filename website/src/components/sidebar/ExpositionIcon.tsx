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
          alt="Exposition Icon"
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
        alt="Exposition Icon"
      />
    </ImgContainer>
  );
};

export default ExpositionIcon;
