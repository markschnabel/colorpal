import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import { NavLink} from 'react-router-dom';

import Container from '../styled/Container';

const StyledNav = styled.nav`
  padding: 20px 0;
  background: transparent;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.neutralColorDarkest};
  text-decoration: none;
  font-size: 1.15rem;
  font-weight: 200;
  font-size: 1.35rem;
  font-size: 1.35rem;
  margin: 16px;
  transition: color 0.5s ease;

  &.active {
    font-size: 1.65rem;
  }

  &:hover {
    color: ${({ theme }) => theme.primaryColorDark};
    cursor: pointer;
  }
`;

const StyledIcon = styled.a`
  font-size: 1.6rem;
  margin-left: 25px;
  color: ${({ theme }) => theme.neutralColorDarkest};
  color: ${({ theme }) => theme.neutralColorDark};
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
            <StyledNavLink to="/" exact={true} activeClassName="active">ColorPal</StyledNavLink>
            <StyledNavLink to="/about" activeClassName="active">About</StyledNavLink>
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