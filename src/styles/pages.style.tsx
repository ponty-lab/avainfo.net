import styled from "styled-components";

interface styledNavProps {
  extendNavBar?: boolean;
  reverse?: boolean;
}

export const Page = styled.div<styledNavProps>`
  margin: 10px;
  margin-left: 50px;
  margin-right: 20px;

  @media (max-width: 900px) {
    margin-left: 30px;
  }
`;
