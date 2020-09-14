import React from 'react';
import { RiFileSearchLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50vh;

  p {
    margin: 24px auto;
  }

  a {
    margin-bottom: 24px;
  }
`

const NotFound = () => {
  return (
    <NotFoundContainer>
      <h1>Not Found</h1>
      <p>We're sorry, we couldn't find the page you were looking for.</p>
      <Link to="/">Click here to go back home</Link>
      <RiFileSearchLine size={200} />
    </NotFoundContainer>
  )
}

export default NotFound
