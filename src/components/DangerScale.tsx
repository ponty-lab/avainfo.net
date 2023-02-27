import AvaColors from "../styles/colors.style";
import { ColorBox, DangerScaleBar } from "../styles/map.style";

const DangerScale = () => {
  return (
    <DangerScaleBar>
      {[...Object.keys(AvaColors)].map((_, index) =>
        index < 5 ? (
          <ColorBox level={String(index + 1)}>index + 1</ColorBox>
        ) : null
      )}
    </DangerScaleBar>
  );
};

export default DangerScale;
