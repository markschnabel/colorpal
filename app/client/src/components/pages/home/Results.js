import React, { Component } from 'react';
import styled from 'styled-components';

const UploadedImage = styled.img`
  margin-top: 32px;
  max-width: 450px;
  max-height: 350px;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.20);
`;

const ColorGrid = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Swatch = styled.div`
  background: ${props => props.color.hex};
  height: 100px;
  width: 100px;
  border-radius: 8px;
  margin: 12px;
  cursor: pointer;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.20);
`;

const Color = ({ color }) => {
  return (
    <div>
      <Swatch color={color} />
      <p>{color.hex}</p>
      <p>{color.rgb}</p>
    </div>
  )
};

class Results extends Component {
  state = {
    imageSrc: null
  }

  loadImageIntoState = () => {
    const fileReader = new FileReader();

    fileReader.onload = e => {
      this.setState({ imageSrc: e.target.result });
    };

    fileReader.readAsDataURL(this.props.image);
  };

  componentDidMount() {
    this.loadImageIntoState();
  }

  render() {
    const { imageSrc } = this.state;
    const { palette } = this.props;

    return (
      <div>
        <UploadedImage src={imageSrc} />

        <ColorGrid>
          {palette.map((color, index) => <Color key={`palette-color-${index}`} color={color} /> )}
        </ColorGrid>
      </div>
    )
  }
}

export default Results;
