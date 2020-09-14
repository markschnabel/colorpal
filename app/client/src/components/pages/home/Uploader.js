import React, { Component, Fragment } from "react";
import Dropzone from "react-dropzone";
import { AiOutlineCloudUpload } from 'react-icons/ai';
import styled from "styled-components";

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
  height: 275px;
  box-shadow: ${props => (props.isDragActive ? "0 0 10px #fff" : null)};
  padding: 24px 0px;
  max-width: 650px;
  width: 100%;
  border-radius: 15px;
  border: 1px solid ${({ isDragActive, theme }) => (isDragActive ? theme.primaryColor : theme.neutralColorDarker)};
  background: ${props => props.isDragActive ? "rgba(200, 200, 200, 0.1)" : "transparent"};
  transition: all 0.25s ease;
  margin: auto;
  margin-top: 48px;
`;

const HelperText = styled.p`

`;

const ACCEPTED_FILE_TYPES = "image/jpeg, image/png";
const MAX_FILE_SIZE = 5000000; // 5 mb

const dropzoneRef = React.createRef();

class Uploader extends Component {
  handleClick = e => {
    e.preventDefault();
  };

  handleDrop = (files, rejectedFiles) => {
    if (files.length + rejectedFiles.length > 1) {
      this.props.setError("Only one file can be processed at a time.");
      return;
    }

    if (rejectedFiles.length >= 1) {
      if (rejectedFiles[0].size > MAX_FILE_SIZE) {
        this.props.setError("Files must not exceed 5MB.");
        return;
      }

      if (!ACCEPTED_FILE_TYPES.split(",").includes(rejectedFiles[0].type)) {
        this.props.setError("Files must end in one of the following extensions: .jpg, .jpeg, or .png.");
        return;
      }
    }

    const formData = new FormData();
    formData.append("image", files[0]);

    this.props.fetchResults(formData, files[0], 'upload');
  };

  render() {
    return (
      <Fragment>
        <Dropzone
          multiple={false}
          accept={ACCEPTED_FILE_TYPES}
          maxSize={MAX_FILE_SIZE}
          onDrop={this.handleDrop}
          onClick={this.handleClick}
          ref={dropzoneRef}
        >
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <DragAndDropContainer isDragActive={isDragActive} {...getRootProps()}>
                <AiOutlineCloudUpload style={{ fontSize: '64px' }} />
                <p style={{ margin: '12px' }}>Drag and drop an image here</p>
                <UploadButton onClick={() => dropzoneRef.current.open()}>
                  Manual upload
                </UploadButton>
                <p>
                  Images must be less than 5MB and use one of the following
                  extensions: <strong>.jpg</strong>, <strong>.jpeg</strong> or
                  <strong>.png</strong>
                </p>
                <input {...getInputProps()} />
              </DragAndDropContainer>
            );
          }}
        </Dropzone>
      </Fragment>
    );
  }
}

export default Uploader;
