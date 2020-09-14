import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { extractPalette } from '../actions/palette';
import { WaveSpinner } from 'react-spinners-kit';

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

const Home = ({ extractPalette, palette }) => {
  return (
    <HomePageContainer>
      <h1>Colorpal</h1>

      <DescriptionText>
        ColorPal is a tool that allows you to turn images into color palettes for whatever project you may want to use them for.
        Simply submit an image down below and we'll extract it's primary colors and create your perfect palette.
      </DescriptionText>

      {(() => {
        if (palette.loading)
          return <WaveSpinner size={125} style={{ margin: '32px auto' }} color="#686769" />

        if (!palette.palette)
          return <Uploader extractPalette={extractPalette} />

        return <h1>{palette.palette.map(p => JSON.stringify(p)).join(', ')}</h1>
      })()}

    </HomePageContainer>
  )
}

const mapStateToProps = state => ({
  palette: state.palette,
  loading: state.loading,
  errors: state.errors,
});

export default connect(mapStateToProps, { extractPalette })(Home)
