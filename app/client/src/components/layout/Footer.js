import React from 'react';
import styled from 'styled-components';

import Container from '../shared/Container';

const StyledFooter = styled.footer`
  height: 100%;
  min-height: 200px;
  width: 100%;
  padding: 25px 0;
  background: #050505;
`;

const FooterGrid = styled.footer`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
`;

const StyledList = styled.ul`
  padding: 0;
  list-style: none;
  width: 100%;
`;

const StyledListItem = styled.li`
  margin: 25px 0;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.neutralColorLightest};
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.neutralColorLighter};
  font-size: 1.15rem;
  transition: all 0.5s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
    text-decoration: underline;
  }
`;

const Copyright = styled.p`
  font-size: 1.15rem;
  font-weight: 500;
  margin-top: 5%;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.neutralColorLightest};
`;

const ExternalLink = ({ href, text }) => {
  return (
    <StyledLink href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </StyledLink>
  );
};

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <FooterGrid>
          <StyledList>
            <StyledListItem>
              <Title>Source Code:</Title>
            </StyledListItem>
            <StyledListItem>
              <ExternalLink
                href="https://github.com/markschnabel/colorpal"
                text="GitHub"
              />
            </StyledListItem>
          </StyledList>

          <StyledList>
            <StyledListItem>
              <Title>Creator:</Title>
            </StyledListItem>
            <StyledListItem>
              <StyledLink href="mailto:mark.schnabel@markschnabel.com">
                mark.schnabel@markschnabel.com
              </StyledLink>
            </StyledListItem>
            <StyledListItem>
              <ExternalLink
                href="https://markschnabel.com"
                text="https://markschnabel.com"
              />
            </StyledListItem>
            <StyledListItem>
              <ExternalLink
                href="https://www.linkedin.com/in/mark-j-schnabel/"
                text="Linked In"
              />
            </StyledListItem>
            <StyledListItem>
              <ExternalLink
                href="https://github.com/markschnabel/"
                text="GitHub"
              />
            </StyledListItem>
          </StyledList>
        </FooterGrid>

        <Copyright>
          Copyright {new Date().getFullYear()} © Mark Schnabel
        </Copyright>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
