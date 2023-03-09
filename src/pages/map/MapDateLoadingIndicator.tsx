import React, { memo } from "react";
import styled from "styled-components";
import { RotatingLines } from "react-loader-spinner";

type Props = {
  tileDate: string | null;
};

const DateLoadingIndicator: React.FC<Props> = ({ tileDate }) => {
  return (
    <DateContainer>
      {tileDate ? (
        <MapLabel>{tileDate}</MapLabel>
      ) : (
        <>
          <RotatingLines
            width="20"
            strokeColor="white"
            strokeWidth="5"
            ariaLabel="rotating-bars-loading"
            visible={true}
          />
          <MapLabel>Loading Tileset</MapLabel>
        </>
      )}
    </DateContainer>
  );
};

const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  justify-content: center;
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 1;
  width: 215px;
  height: 32px;
  border-radius: 50px;
  background: ${(props) => props.theme.colors.primary};
`;

const MapLabel = styled.div`
  display: flex;
  justify-content: center;
  padding: 3px 18px;
  padding-top: 3px !important;
  padding-bottom: 3px !important;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: white;
`;

export default memo(DateLoadingIndicator);
