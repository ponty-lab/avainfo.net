import styled from "styled-components";
import { ScrollView, Wrapper } from "../../styles/pages.style";
import { Link } from "react-router-dom";
import Legal from "../../components/legal";

const Terms = () => {
  return (
    <ScrollView>
      <Banner>
        <Wrapper>
          <h1 style={{ color: "white", fontSize: 42, fontWeight: 500 }}>
            LEGAL
          </h1>
        </Wrapper>
      </Banner>
      <Wrapper style={{ flex: 0.9 }}>
        <h1>Terms of Use</h1>
        <p>
          AvaInfo. Mapbox tileset to show avalanche danger ratings in the Alps
          and the Pyrenees.
        </p>{" "}
        <p> Copyright © 2023 Carla Pont</p>{" "}
        <p>
          {" "}
          This program is free software: you can redistribute it and/or modify
          it under the terms of the GNU General Public License as published by
          the Free Software Foundation, either version 3 of the License, or (at
          your option) any later version.
        </p>{" "}
        <p>
          {" "}
          This program is distributed in the hope that it will be useful, but
          WITHOUT ANY WARRANTY; without even the implied warranty of
          MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
          General Public License for more details.
        </p>{" "}
        <p>
          {" "}
          You should have received a copy of the GNU General Public License
          along with this program. If not, see{" "}
          <a href="https://www.gnu.org/licenses/">
            https://www.gnu.org/licenses/
          </a>
          .
        </p>
      </Wrapper>

      <Legal flex="0.1">
        <>
          Copyright © 2023 Carla Pont |{" "}
          <PrivacyLink to="/privacy">Privacy Policy</PrivacyLink> |{" "}
          <PrivacyLink to="/terms">Terms</PrivacyLink>
        </>
      </Legal>
    </ScrollView>
  );
};

const Banner = styled.div`
  display: block;
  background: ${({ theme }) => theme.colors.primary};
  padding-top: 36px;
  padding-bottom: 12px;
`;

export const PrivacyLink = styled(Link)`
  color: white;
`;

export default Terms;
