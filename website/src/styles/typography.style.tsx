import styled from "styled-components";
import { device } from "../utils/constants";

interface styledCaptionProps {
  validDate?: boolean;
}

export const Caption = styled.p<styledCaptionProps>`
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 500;
`;

export const ThemedCaption = styled(Caption)<{ validDate?: boolean }>`
  margin: 10px 0px;
  color: ${(props) => (props.validDate ? "red" : props.theme.colors.primary)};
  font-weight: ${(validDate) => (validDate ? 500 : 400)};
`;

export const Label = styled(Caption)`
  margin-top: 0px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  font-size: 14px;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: 32px;
  margin-top: 12px;
  margin-bottom: 12px;
`;

export const MediumTitle = styled.h1`
  font-weight: 500;
  margin-top: 30px;
`;

export const WhiteText = styled.p`
  color: white;
  margin-top: 12px;
`;

export const StyledH2 = styled.h2<{ marginTop?: string }>`
  margin: 30px 0px 12px;
  margin-top: ${(props) => props.marginTop};
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  padding-top: 0.2em;
`;

export const StyledH3 = styled.h3`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  margin-top: 12px;
`;

export const StyledUL = styled.ul`
  margin-left: 0;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem @media and screen and (${device.tablet}) {
    margin-left: 2.5rem;
  }
`;

export const StyledLI = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.5em;
`;
