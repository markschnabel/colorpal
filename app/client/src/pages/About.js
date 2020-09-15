import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';

import Demo from "../images/photo-with-palette.png";
import ColorPlot from "../images/color-plot.png";
import Stack from "../images/stack.png";

const BodyText = styled.p`
  font-size: 16px;
  color: #333;
  margin: 18px 0;
  font-family: ${({ theme }) => theme.secondaryFont};
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.primaryColor};
  cursor: pointer;
`
const ExternalLink = ({ text, href }) => (
  <StyledLink
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {text}
  </StyledLink>
);

const ImageContainer = styled.img`
  width: 480px;
  height: 319px;
  text-align: left;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.20);
  -webkit-box-shadow: 0 15px 20px rgba(0, 0, 0, 0.20);
  -moz-box-shadow: 0 15px 20px rgba(0, 0, 0, 0.20);

  @media screen and (max-width: 1120px) {
    width: 416px;
    height: 276px;
  }
`;

const LargeImageContainer = styled.img`
  width: 474px;
  height: 405px;
  text-align: left;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.20);
  -webkit-box-shadow: 0 15px 20px rgba(0, 0, 0, 0.20);
  -moz-box-shadow: 0 15px 20px rgba(0, 0, 0, 0.20);
`;

const About = () => {
  return (
    <Grid>
      <Row reverse style={{ maxWidth: 720, margin: "auto", marginTop: 50 }}>
        <Col lg={12}>
          <h1>Colorpal</h1>
          <BodyText>
            Colorpal was originally started as a student project by <ExternalLink text="@markschnabel" href="https://markschnabel.com"  /> who
            still maintains the project. It was started as an attempt to create a tool that would help designers, engineers,
            artists and whoever else may need it come up with great color schemes for their next project.
            <br />
            <br />
            There are many tools online that help generate appealing color palettes, but most of these tools generate palettes totally
            at random. The problem with this is that while the palettes might be very good looking they may not fit the branding or the
            desired "feel" for the project. The goal of Colorpal was to create a tool that would give users a bit more say over
            the colors that get generated.
          </BodyText>
          </Col>
      </Row>

      <Row style={{ marginTop: 50 }}>
        <Col lg={6} style={{ textAlign: "center" }}>
          <ImageContainer src={Demo} alt="" />
          <BodyText>
            Original Photo By:&nbsp;
            <ExternalLink
              text="Carl Larson from Pexels"
              href="https://www.pexels.com/photo/beautiful-blur-dandelion-dandelion-seeds-428062/"
            />
          </BodyText>
        </Col>
        <Col lg={6}>
          <BodyText>
            The way this was achieved was by allowing users to upload an image and using that to generate the palette.
            This allows users to pick out an image where the colors represent exactly how they want their project to be branded,
            as they already know how the colors look and feel together because they've already seen them compiled into an image.
            <br />
            <br />
            The image next to this paragraph is an example of what Colorpal can do. The original image by Carl Larson is a photograph
            of a flower at sunset that gives off a very relaxed feel, and the palette underneath the image was extracted using Colorpal.
            The palette <i>hopefully</i> gives off the same feel that the image does.
          </BodyText>
        </Col>
      </Row>

      <Row reverse style={{ marginTop: 50 }}>
        <Col lg={6} style={{ textAlign: "center" }}>
          <LargeImageContainer src={ColorPlot} alt="" />
        </Col>
        <Col lg={6}>
          <h2>How it works: K-Means clustering</h2>
          <BodyText>
            Colorpal uses a method called K-Means clustering to generate color palettes. K-Means clustering is an unsupervised learning
            technique which is used to categorize a set of data points into "k" distinct groups despite no real prior knowledge about the data.
            In the case of Colorpal, the data is the representation of the image in computer memory and the desired number of distinct groups is
            five, where the five items in the group make up the color palette of the image.
            <br />
            <br />
            Next to this paragraph you can see a 3D plot generated using Python and matplotlib that shows the results of running K-Means clustering
            on the image by Carl Larson above. As you can see the algorithm has extracted five distinct clusters of R, G, B values, which essentially
            represent the five dominant colors or the color palette of the image.
          </BodyText>
        </Col>
      </Row>

      <Row style={{ marginTop: 50 }}>
        <Col lg={6} style={{ textAlign: "center" }}>
          <LargeImageContainer src={Stack} alt="" />
        </Col>
        <Col lg={6}>
          <h2>How it works: Architecture</h2>
          <BodyText>
            ColorPal uses a SPA/REST based architecture. It uses a React SPA for the frontend, which was chosen because of how easy React makes it
            to create high quality user interfaces. The project also makes use of Redux for state management and styled components
            as the primary way of styling the application.
            <br />
            <br />
            It also utilizes a minimal Python/Flask REST API on the backend. Python was chosen because of all of its available packages for working with
            data and its easy integration with OpenCV which was the primary package used for image processing. Flask was chosen because it's a really
            fantastic microframework that allowed for a minimal API to be created without any unecessary clutter.
          </BodyText>
        </Col>
      </Row>

      <Row style={{ marginTop: 50 }}>
        <Col lg={12} style={{ maxWidth: 720, margin: "auto" }}>
          <h2>Contributing</h2>
          <BodyText>
            The project is not currently undergoing any active development, but it's entirely open source and MIT licensed and could definitely be expanded
            upon. <ExternalLink text="The repository can be found here" href="https://github.com/markschnabel/colorpal" /> and anyone who wishes to contribute or add
            to the project should feel encouraged to open up a pull request or contact me at <StyledLink href="mailto:mark.schnabel@markschnabel.com">mark.schnabel@markschnabel.com</StyledLink>
          </BodyText>
        </Col>
      </Row>
    </Grid>
  )
}

export default About
