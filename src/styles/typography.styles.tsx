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

export const Title = styled.h1`
  font-size: calc(22px + (32 - 22) * ((100vw - 300px) / (1600 - 300)));
  color: ${(props) => props.theme.primaryColor};
`;

export const SubHeader = styled.h2`
  font-size: calc(16px + (24 - 16) * ((100vw - 300px) / (1600 - 300)));
  font-weight: 600;
  line-height: 1.6em;
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
