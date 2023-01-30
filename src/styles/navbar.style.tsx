import styled from "styled-components";
import { Link } from "react-router-dom";

interface styledNavProps {
  extendNavBar?: boolean;
  animate?: boolean;
  reverse?: boolean;
}

const navHeight = "60px";

export const Nav = styled.nav<styledNavProps>`
  width: 100%;
  height: ${(props) => (props.extendNavBar ? "100vh" : navHeight)};
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: 20px 4px 10px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #eaecef;
  z-index: 20;

  @media (min-width: 900px) {
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
  margin-right: 25px;
`;

export const LeftContainer = styled.div`
  flex: 30%;
  display: flex;
  justify-content: flex-start;
  margin-left: 30px;

  @media (max-width: 900px) {
    margin-left: 10px;
  }
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.primaryColor};
  font-weight: 600;
  text-decoration: none;
  margin: 10px;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.accentColor};
    z-index: 1;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const NavLinkExtended = styled(Link)`
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1.25em;
  font-weight: 600;
  text-decoration: none;
  margin: 10px;
`;

export const Logo = styled.img`
  margin: 10px;
  max-width: 125px;
  height: auto;
`;

export const OpenLinkButton = styled.button<styledNavProps>`
  width: 45px;
  height: 45px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: ${({ theme }) => theme.primaryColor};
  //font-size: ${(props) => (props.extendNavBar ? "40px" : "45px")};
  cursor: pointer;
  animation-name: ${(props) => (props.animate ? "spin" : null)};
  animation-direction: ${(props) =>
    props.extendNavBar ? "normal" : "reverse"};
  animation-duration: ${(props) => (props.extendNavBar ? "300ms" : "150ms")};
  animation-fill-mode: both;

  @keyframes spin {
    from {
      transform: rotate(90deg);
    }
    to {
      transform: rotate(270deg);
    }
  }

  @media (min-width: 900px) {
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
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
  margin-left: 20px;

  @media (min-width: 900px) {
    display: none;
  }
`;
