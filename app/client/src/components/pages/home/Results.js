import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPalette } from '../../../actions/palette';
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
  margin: 18px;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.20);
`;

const ColorText = styled.p`
  font-family: ${({ theme }) => theme.secondaryFont};
  font-weight: 200;
  margin: 4px;
`;

const Color = ({ color }) => {
  return (
    <div>
      <Swatch color={color} />
      <ColorText>{color.hex}</ColorText>
      <ColorText>{`rgb(${color.rgb.join(', ')})`}</ColorText>
    </div>
  )
};

const ResetButton = styled.button`
  border: none;
  background: none;
  text-decoration: underline;
  font-size: 16px;
  font-weight: semibold;
  cursor: pointer;
  margin: 32px;
`;

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
    const { palette, resetPalette } = this.props;

    return (
      <div>
        <UploadedImage src={imageSrc} />

        <ColorGrid>
          {palette.map((color, index) => <Color key={`palette-color-${index}`} color={color} /> )}
        </ColorGrid>

        <ResetButton onClick={resetPalette}>Click here to try again</ResetButton>
      </div>
    )
  }
}

export default connect(null, { resetPalette })(Results);
