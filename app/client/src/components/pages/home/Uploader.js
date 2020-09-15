import React from 'react';
import { connect } from 'react-redux';
import { extractPalette, setPaletteError } from '../../../actions/palette';
import Dropzone from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import styled from 'styled-components';

const DescriptionText = styled.p`
  font-weight: light;
  max-width: 700px;
  margin: auto;
  font-size: 18px;
  margin-top: 20px;
`;

const UploadButton = styled.button`
  width: 400px;
  display: block;
  margin: auto;
  margin-bottom: 20px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.neutralColorDarker};
  color: ${({ theme }) => theme.neutralColorLightest};
  font-size: 16px;
  font-weight: 200;
  width: 250px;
  height: 60px;
  cursor: pointer;
`;

const DragAndDropContainer = styled.div`
  height: 300px;
  box-shadow: ${props => (props.isDragActive ? "0 0 10px #fff" : null)};
  padding: 24px 0px;
  max-width: 650px;
  width: 100%;
  border-radius: 15px;
  border: 1px solid ${({ isDragActive, theme }) => (isDragActive ? theme.primaryColor : theme.neutralColorDarker)};
  background: ${props => props.isDragActive ? "rgba(200, 200, 200, 0.1)" : "transparent"};
  transition: all 0.25s ease;
  margin: auto;
  margin-top: 64px;
`;

const HelperText = styled.p`
  max-width: 450px;
  margin: auto;
`

const ErrorMessage = styled.p`
  max-width: 450px;
  margin: 16px auto;
  color: #ff0033;
`

const ACCEPTED_FILE_TYPES = "image/jpeg, image/png";
const MAX_FILE_SIZE = 5000000; // 5 mb

const dropzoneRef = React.createRef();

const Uploader = (props) => {
  const handleUploadButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dropzoneRef.current.open();
  }

  const handleDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length + rejectedFiles.length > 1) {
      props.setPaletteError("Only one file can be processed at a time.");

      return;
    }

    if (rejectedFiles.length >= 1) {
      if (rejectedFiles[0].size > MAX_FILE_SIZE) {
        props.setPaletteError("Files must not exceed 5MB.");

        return;
      }

      if (!ACCEPTED_FILE_TYPES.split(",").includes(rejectedFiles[0].type)) {
        props.setPaletteError("Files must end in one of the following extensions: .jpg, .jpeg, or .png.");

        return;
      }
    }

    const image = acceptedFiles[0];

    const data = new FormData();
    data.append('image', image);

    props.extractPalette(data, image);
  };

  return (
    <>
      <DescriptionText>
        Colorpal is a tool that allows you to turn images into color palettes for whatever project you may want to use them for.
        Simply submit an image down below and we'll extract it's primary colors and create your perfect palette.
      </DescriptionText>

      <Dropzone
        ref={dropzoneRef}
        multiple={false}
        accept={ACCEPTED_FILE_TYPES}
        maxSize={MAX_FILE_SIZE}
        onDrop={handleDrop}
        noClick
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <DragAndDropContainer {...getRootProps()} isDragActive={isDragActive}>
            <AiOutlineCloudUpload style={{ fontSize: '64px' }} />
            <p style={{ margin: '10px' }}>
              Drag and drop an image here
            </p>
            <UploadButton onClick={handleUploadButtonClick}>
              Manual upload
            </UploadButton>

            <HelperText>
              Images must be less than 5MB and use one of the following
              extensions: <strong>.jpg</strong>, <strong>.jpeg</strong> or
              <strong>.png</strong>
            </HelperText>

            <input {...getInputProps()} />
          </DragAndDropContainer>
        )}
      </Dropzone>

      <ErrorMessage>{props.error}</ErrorMessage>
    </>
  );
};

const mapStateToProps = state => ({
  error: state.palette.error
});

export default connect(mapStateToProps, { extractPalette, setPaletteError })(Uploader);
