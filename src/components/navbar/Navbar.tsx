import React, { useState } from "react";
import {
  Nav,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavLink,
  Logo,
  OpenLinkButton,
  NavLinkExtended,
  IconContainer,
} from "../../styles/navbar.style";
import Icon from "../../assets/logo.png";
import { GoMarkGithub } from "react-icons/go";
import { VscChromeClose, VscDebugPause } from "react-icons/vsc";
import { useTheme } from "styled-components";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [extendNavBar, setExtendNavBar] = useState(false);
  const [animate, setAnimation] = useState(false);

  const onClick = () => {
    setAnimation(true);
    setExtendNavBar((curr) => !curr);
  };

  const theme = useTheme();

  return (
    <Nav extendNavBar={extendNavBar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <Link to="/" onClick={onClick}>
            <Logo src={Icon} alt="AvaInfo logo"></Logo>
          </Link>
        </LeftContainer>
        <RightContainer>
          <NavbarLinkContainer>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/docs">Docs</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <IconContainer>
              <a href="https://github.com/ponty-lab/ponty-lab.github.io">
                <GoMarkGithub
                  style={{ verticalAlign: "middle" }}
                  color={theme.colors.primary}
                  size={30}
                  aria-label="Github"
                />
              </a>
            </IconContainer>
            <OpenLinkButton
              onAnimationEnd={() => setAnimation(false)}
              animate={animate}
              extendNavBar={extendNavBar}
              onClick={onClick}
            >
              {extendNavBar ? (
                <VscChromeClose size={30} />
              ) : (
                <VscDebugPause
                  style={{ transform: "rotate(90deg)" }}
                  size={30}
                />
              )}
            </OpenLinkButton>
          </NavbarLinkContainer>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavBar && (
        <NavbarExtendedContainer>
          <NavLinkExtended onClick={onClick} to="/">
            Danger Map
          </NavLinkExtended>
          <NavLinkExtended onClick={onClick} to="/docs">
            Docs
          </NavLinkExtended>
          <NavLinkExtended onClick={onClick} to="/about">
            About Us
          </NavLinkExtended>
        </NavbarExtendedContainer>
      )}
    </Nav>
  );
};

export default Navbar;
