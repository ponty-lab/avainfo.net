import AvaColors from "../styles/colors.style";

type BoxProps = {
  color: string;
  number: number;
};

const Box = ({ color, number }: BoxProps) => {
  return (
    <div className="box" style={{ backgroundColor: color, opacity: 0.8 }}>
      {number}
    </div>
  );
};

const DangerScale = () => {
  return (
    <div className="scale">
      {[...Object.keys(AvaColors)].map((_, index) =>
        index < 5 ? (
          <Box color={AvaColors[String(index + 1)]} number={index + 1} />
        ) : null
      )}
    </div>
  );
};

export default DangerScale;
