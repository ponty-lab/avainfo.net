import React from "react";
import { Homepage, MapContainer } from "../styles/map.style";
import { SidebarContainer } from "../styles/sidebar.style";

const About = () => {
  return (
    <Homepage>
      <SidebarContainer>
        <h1>SideBar</h1>
      </SidebarContainer>
      <MapContainer>
        <h1>Map container</h1>
      </MapContainer>
    </Homepage>
  );
};

export default About;
