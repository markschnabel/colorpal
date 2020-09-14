import React from 'react';
import styled from 'styled-components';

import Container from '../shared/Container';

const Content = styled.div`
  min-height: 100vh;
  height: 100%;
  padding-bottom: 60px;
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default Layout
