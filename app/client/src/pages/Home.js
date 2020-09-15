import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { extractPalette } from '../actions/palette';
import { WaveSpinner } from 'react-spinners-kit';

import Uploader from '../components/pages/home/Uploader';
import Results from '../components/pages/home/Results';

const HomePageContainer = styled.div`
  text-align: center;
  padding: 48px;
`;

const Home = ({ extractPalette, palette }) => {
  return (
    <HomePageContainer>
      <h1>Colorpal</h1>

      {(() => {
        if (palette.loading) {
          return <WaveSpinner size={125} style={{ margin: '32px auto' }} color="#686769" />;
        }

        if (palette.palette && palette.image) {
          return <Results palette={palette.palette} image={palette.image} />;
        }

        return <Uploader extractPalette={extractPalette} />;
      })()}

    </HomePageContainer>
  )
}

const mapStateToProps = state => ({
  palette: state.palette,
  image: state.image,
  loading: state.loading,
  errors: state.errors,
});

export default connect(mapStateToProps, { extractPalette })(Home)
