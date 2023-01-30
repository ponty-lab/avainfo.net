import styled from "styled-components";

interface styledCaptionProps {
  validDate: boolean;
}

export const Caption = styled.div<styledCaptionProps>`
  margin-top: -5px;
  font-size: 14px;
  color: ${(props) => (props.validDate ? "red" : props.theme.primaryColor)};
  font-weight: ${(props) => (props.validDate ? "bold" : "normal")};
`;

export const Footer = styled.div`
  &:before {
    color: #fff;
    display: block;
    font-size: 110%;
    font-weight: 700;
    text-align: center;
    margin-bottom: 40px;
  }
  &:a {
    color: #fff;
    text-align: right;
  }
  #page {
    margin-bottom: 0;
  }
`;
