import React, { memo, useRef } from "react";
import styled from "styled-components";
import { useMap } from "./useMap";
import ToggleButton from "./MapToggleButton";
import Sidebar from "../../components/sidebar";
import DateLoadingIndicator from "./MapDateLoadingIndicator";

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const {
    tileDate,
    bulletin,
    onPress,
    modalOpen,
    options,
    changeState,
    active,
  } = useMap(mapContainer);

  return (
    <MapContainer position="relative">
      <MapContainer position="absolute" ref={mapContainer} />
      <ToggleButton
        options={options}
        property={active.property}
        changeState={changeState}
      />
      <DateLoadingIndicator tileDate={tileDate} />
      <Sidebar data={bulletin} onPress={onPress} visible={modalOpen} />
    </MapContainer>
  );
};

const MapContainer = styled.div<{ position: string }>`
  position: ${(props) => props.position};
  width: 100%;
  height: calc(100vh - 60px);
`;

export default memo(Map);
