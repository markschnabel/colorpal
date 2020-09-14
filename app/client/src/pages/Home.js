import React from 'react';
import styled from 'styled-components';

import Uploader from '../components/pages/home/Uploader';

const HomePageContainer = styled.div`
  text-align: center;
  padding: 48px;
`;

const DescriptionText = styled.p`
  font-weight: light;
  max-width: 700px;
  margin: auto;
  font-size: 18px;
  margin-top: 20px;
`;

const Home = () => {
  return (
    <HomePageContainer>
      <h1>Colorpal</h1>
      <DescriptionText>
        ColorPal is a tool that allows you to turn images into color palettes for whatever project you may want to use them for.
        Simply submit an image down below and we'll extract it's primary colors and create your perfect palette.
      </DescriptionText>
      <Uploader />
    </HomePageContainer>
  )
}

export default Home
