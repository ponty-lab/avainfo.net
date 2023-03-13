import styled from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../utils/constants";

interface styledNavProps {
  extendNavBar?: boolean;
  animate?: boolean;
  reverse?: boolean;
}

const navHeight = "60px";

export const Nav = styled.nav<styledNavProps>`
  width: 100%;
  height: ${(props) => (props.extendNavBar ? "100vh" : navHeight)};
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
  z-index: 20;

  @media screen and (${device.tablet}) {
    height: navHeight;
  }
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: navHeight;
  display: flex;
`;

export const RightContainer = styled.div`
  flex: 70%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;

  @media screen and (${device.mobileM}) {
    margin-right: 25px;
  }
`;

export const LeftContainer = styled.div`
  flex: 30%;
  display: flex;
  justify-content: flex-start;
  margin-left: 10px;

  @media screen and (${device.mobileM}) {
    margin-right: 20px;
  }
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 1.25em;
  text-decoration: none;
  margin: 10px;
  display: none;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    z-index: 1;
  }

  @media screen and (${device.tablet}) {
    display: flex;
  }
`;

export const NavLinkExtended = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25em;
  font-weight: 600;
  text-decoration: none;
  margin: 10px;
`;

export const Logo = styled.img`
  margin: 10px 10px;
  width: 120px;
  height: 38px;
  max-width: 125px;

  &:hover {
    text-decoration: underline;
  }
`;

export const OpenLinkButton = styled.button<styledNavProps>`
  width: 45px;
  height: 45px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  animation-name: ${(props) => (props.animate ? "spin" : null)};
  animation-direction: ${(props) =>
    props.extendNavBar ? "normal" : "reverse"};
  animation-duration: ${(props) => (props.extendNavBar ? "300ms" : "150ms")};
  animation-fill-mode: both;

  &:hover {
    background: #eaecef;
    border-radius: 50%;
  }

  @keyframes spin {
    from {
      transform: rotate(90deg);
    }
    to {
      transform: rotate(270deg);
    }
  }

  @media screen and (${device.tablet}) {
    display: none;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  width: 45px;
  height: 45px;

  &:hover {
    background: #eaecef;
    border-radius: 50%;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
  margin-left: 20px;

  @media screen and (${device.tablet}) {
    display: none;
  }
`;

//     animation: fill 1s forwards;
//     -webkit-animation: fill 1s forwards;
//     -moz-animation: fill 1s forwards;
