import React from 'react';
import styled from 'styled-components';

import Container from '../styled/Container';

const StyledFooter = styled.footer`
  height: 100%;
  min-height: 200px;
  width: 100%;
  padding: 25px 0;
  background: #050505;
  text-align: center;
`;

const FooterGrid = styled.footer`
  display: grid;
  width: 70%;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  margin: auto;

  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StyledList = styled.ul`
  padding: 0;
  list-style: none;
  width: 100%;
  text-align: left;
  text-align: center;
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
  font-family: ${({ theme }) => theme.secondaryFont};
  font-weight: 200;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
    text-decoration: underline;
  }
`;

const Copyright = styled.p`
  font-size: 1.15rem;
  font-weight: 500;
  margin: 5% auto 50px auto;
  color: ${({ theme }) => theme.neutralColorLightest};
  font-family: ${({ theme }) => theme.secondaryFont};
  font-weight: 200;
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
                text="LinkedIn"
              />
            </StyledListItem>
            <StyledListItem>
              <ExternalLink
                href="https://github.com/markschnabel/"
                text="GitHub"
              />
            </StyledListItem>
          </StyledList>

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
        </FooterGrid>

        <Copyright>
          Copyright {new Date().getFullYear()} © Mark Schnabel
        </Copyright>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
