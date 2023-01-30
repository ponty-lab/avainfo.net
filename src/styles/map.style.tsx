import React from "react";
import styled from "styled-components";

// interface styledMapProps {
//   ref: React.MutableRefObject<any>;
// }

export const Homepage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const MapContainer = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 60px);
`;

export const DateContainer = styled.div`
  position: absolute;
  top: 100px;
  right: 30px;
  z-index: 1;
  background-color: transparent;
`;
