import React from 'react';
import styled from 'styled-components';

import Container from '../styled/Container';
import Navbar from './Navbar';
import Footer from './Footer';

const Content = styled.div`
  min-height: 75vh;
  height: 100%;
  padding-bottom: 60px;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
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
