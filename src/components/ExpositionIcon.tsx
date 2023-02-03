import { TAspect } from "../models";
import { Exposition } from "../utils";

type Props = {
  aspects: TAspect[];
  size?: number;
  caption?: boolean;
  padding?: number;
  //captionText?: string
};

export const ExpositionIcon = ({ aspects, size, caption, padding }: Props) => {
  const SIZE = size;

  if (!aspects) {
    return null;
  }

  const images = Array.from(
    aspects.map((aspect, index) => {
      return (
        <img
          key={`aspect_${index}`}
          src={Exposition[aspect].uri}
          style={{ position: "absolute", width: SIZE, height: SIZE }}
        />
      );
    })
  );

  return (
    <div style={{ position: "relative", flex: 0.5, marginRight: 30 }}>
      {caption ? <p>Aspects</p> : null}
      <div>
        {[...images]}
        <img
          src={Exposition.BG.uri}
          style={{ position: "absolute", width: SIZE, height: SIZE }}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    //justifyContent: "center",
    //alignItems: "center",
  },
};
