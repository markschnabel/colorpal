import React from 'react';
import styled from 'styled-components';

import Container from '../shared/Container';
import Footer from './Footer';

const Content = styled.div`
  min-height: 70vh;
  height: 100%;
  padding-bottom: 60px;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Container>
        <Content>
          {children}
        </Content>
      </Container>
      <Footer />
    </>
  );
};

export default Layout
