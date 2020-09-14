import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import { NavLink} from 'react-router-dom';

import Container from '../shared/Container';

const StyledNav = styled.nav`
  padding: 20px 0;
  background: transparent;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled(NavLink)`
  margin: 0;
  margin-right: 25px;
  display: inline;
  transition: all 0.5s ease;
  font-size: 1.75rem;
  text-decoration: none;
  color: ${({ theme }) => theme.neutralColorDarkest};
  font-weight: 200;

  &:hover {
    color: ${({ theme }) => theme.primaryColorDark};
    cursor: pointer;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.neutralColorDarkest};
  font-size: 1.15rem;
  font-weight: 200;
  font-size: 1.35rem;
  transition: all 0.5s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryColorDark};
    cursor: pointer;
  }
`;

const StyledIcon = styled.a`
  font-size: 1.35rem;
  margin-left: 25px;
  color: ${({ theme }) => theme.neutralColorDarkest};
  transition: all 0.5s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryColorDark};
    cursor: pointer;
  }
`;

const IconLink = ({ icon, href }) => {
  return (
    <StyledIcon href={href} target="_blank" rel="noopener noreferrer">
      {icon}
    </StyledIcon>
  );
};

const Navbar = () => {
  return (
    <StyledNav>
      <Container>
        <FlexContainer>
          <span>
            <Brand to="/">ColorPal</Brand>
            <StyledNavLink to="/about">About</StyledNavLink>
          </span>
          <span>
            <IconLink
              icon={<FaGithub />}
              href="https://github.com/markschnabel/colorpal"
            />
          </span>
        </FlexContainer>
      </Container>
    </StyledNav>
  );
};

export default Navbar;