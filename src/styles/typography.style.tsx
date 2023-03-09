import styled from "styled-components";

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
