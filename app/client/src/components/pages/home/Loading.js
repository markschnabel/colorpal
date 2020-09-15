import React from 'react';
import styled from 'styled-components';
import {
  WaveSpinner,
  HoopSpinner,
  FireworkSpinner,
  CombSpinner,
  PongSpinner,
  JellyfishSpinner,
  FlagSpinner,
  PushSpinner
} from 'react-spinners-kit';

const LoadingContainer = styled.div`
  margin-top: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const spinners = [
  WaveSpinner,
  HoopSpinner,
  FireworkSpinner,
  CombSpinner,
  PongSpinner,
  JellyfishSpinner,
  FlagSpinner,
  PushSpinner
];

const Loading = () => {
  const Tag = spinners[Math.floor(Math.random() * spinners.length)];

  return (
    <LoadingContainer>
      <Tag size={125} style={{ margin: '32px auto' }} color="#686769" />
      <p style={{ marginTop: '64px' }}>Generating your palette...</p>
    </LoadingContainer>
  )
}

export default Loading
