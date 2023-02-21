import styled, { css, DefaultTheme } from "styled-components";

interface styledCaptionProps {
  validDate?: boolean;
}

export const Caption = styled.p<styledCaptionProps>`
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 500;
`;

export const ThemedCaption = styled(Caption)<{ validDate?: boolean }>`
  margin-top: 10px;
  color: ${(props) => (props.validDate ? "red" : props.theme.primaryColor)};
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
  color: ${(props) => props.theme.primaryColor};
`;

export const H3 = styled.h3<{ marginTop?: string }>`
  margin-top: ${(props) => props.marginTop};
`;

export const Footer = styled.div`
  &:before {
    background: gray;
    color: #fff;
    display: block;
    //font-size: 110%;
    //font-weight: 700;
    text-align: center;
    margin-bottom: 40px;
  }
`;
