import styled from "styled-components";
import { hexToRGB } from "../utils";

interface styledPage {
  height?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HorizontalBar = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

export const Page = styled(Container)<styledPage>`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
  margin-right: 20px;
  height: auto;
`;

export const View = styled(Container)`
  margin: 10px 15px 10px 0px;

  @media (max-width: 768px) {
    margin: 0px 0px;
  }
`;
