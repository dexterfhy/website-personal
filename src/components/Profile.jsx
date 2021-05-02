import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  GithubOutlined,
  LinkedinOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { Divider, Tooltip } from 'antd'
import { CUSTOM_EVENTS } from '../constants'

const StyledProfileContainer = styled.div`
  && {
    width: 100%;
    height: auto;
    position: relative;
  }

  @media only screen and (min-width: 0px) {
    margin-top: 3%;
    margin-bottom: 3%;
  }
  @media only screen and (min-width: 800px) {
    margin-top: 10%;
    margin-bottom: 10%;
  }
`

const StyledTitle = styled.h1`
  && {
    white-space: nowrap;
    font-family: 'Roboto Mono', monospace;
    font-weight: bold;
    font-size: 4.5vw;
    margin-bottom: 0;
    text-align: justify;
    color: white;

    @media only screen and (min-width: 300px) {
      font-size: 6vw;
    }
    @media only screen and (min-width: 800px) {
      font-size: 3.8vw;
    }
    @media only screen and (min-width: 1200px) {
      font-size: 4.5vw;
    }
  }
`

const StyledBody = styled.p`
  && {
    font-family: 'Roboto Mono', monospace;
    text-align: justify;

    @media only screen and (min-width: 0px) {
      font-size: 2.4vw;
    }
    @media only screen and (min-width: 480px) {
      font-size: 2.4vw;
    }
    @media only screen and (min-width: 600px) {
      font-size: 2vw;
    }
    @media only screen and (min-width: 800px) {
      font-size: 2vw;
    }
    @media only screen and (min-width: 1000px) {
      font-size: 1.8vw;
    }
    @media only screen and (min-width: 1400px) {
      font-size: 1.6vw;
    }
    @media only screen and (min-width: 1600px) {
      font-size: 1.4vw;
    }
  }
`

const StyledLinksContainer = styled.div`
  && {
    margin-bottom: 10px;

    span {
      margin-left: 6px;
      margin-right: 6px;
    }

    @media only screen and (min-width: 0px) {
      font-size: 4.5vw;
    }
    @media only screen and (min-width: 400px) {
      font-size: 4vw;
    }
    @media only screen and (min-width: 600px) {
      font-size: 3vw;
    }
    @media only screen and (min-width: 800px) {
      font-size: 2vw;
    }
  }
`

const StyledDivider = styled(Divider)`
  && {
    margin-top: 0px;

    @media only screen and (min-width: 0px) {
      margin-bottom: 4px;
    }
    @media only screen and (min-width: 480px) {
      margin-bottom: 16px;
    }
  }
`

const Profile = (props) => (
  <StyledProfileContainer>
    <StyledTitle>Hello! I'm Dexter.</StyledTitle>
    <StyledLinksContainer>
      <Tooltip placement="bottom" title="GitHub">
        <a
          target="_blank"
          href="https://github.com/dexterfhy"
          rel="noreferrer"
          style={{ color: 'unset' }}
        >
          <GithubOutlined />
        </a>
      </Tooltip>
      <Tooltip placement="bottom" title="LinkedIn">
        <a
          target="_blank"
          href="https://www.linkedin.com/in/dexter-fong-45bb49192/"
          rel="noreferrer"
          style={{ color: 'unset' }}
        >
          <LinkedinOutlined />
        </a>
      </Tooltip>
      <Tooltip placement="bottom" title="Resume">
        <a
          target="_blank"
          href="https://dexter-website.s3-ap-southeast-1.amazonaws.com/Dexter_CV_210501.pdf"
          rel="noreferrer"
          style={{ color: 'unset' }}
        >
          <FileTextOutlined />
        </a>
      </Tooltip>
    </StyledLinksContainer>
    <StyledDivider />
    <StyledBody>
      As a fullstack web developer from Singapore, I{' '}
      <a
        target="_blank"
        href="https://medium.com/ninjavan-tech/designing-ninjachat-bfa2445e84ce"
        rel="noreferrer"
        style={{ color: '#efcb4a' }}
      >
        <u>build and maintain chatbots</u>
      </a>{' '}
      for{' '}
      <a
        target="_blank"
        href="https://sns-qa.ninjavan.co/?system_id=sg"
        rel="noreferrer"
        style={{ color: '#75c0d0' }}
      >
        <u>various social media platforms</u>
      </a>{' '}
      at my current company. I'm passionate about all things programming - from
      systems design, to actual coding (in particular, using functional
      paradigms) and writing tests.
      <br />
      <br />
      Apart from programming, I also enjoy knitting, cooking (as a byproduct of
      my love for eating), and{' '}
      <a
        onClick={() => props.onInputSubmit('Show me pictures of your cats!')}
        style={{ color: '#3ea78d' }}
      >
        <u>petting my two cats</u>
      </a>
      .
      <br />
      <br />
      Have a question or some feedback for me? Feel free to{' '}
      <a
        onClick={() =>
          props.onInputSubmit(
            'I have a message for you, good sir.',
            () => {},
            CUSTOM_EVENTS.TELEGRAM_QUESTION_FEEDBACK_START_EVENT
          )
        }
        style={{ color: '#b15f62' }}
      >
        <u>drop me a quick message here via Telegram</u>
      </a>{' '}
      and I'll get back to you if I'm around!
    </StyledBody>
    <StyledDivider />
  </StyledProfileContainer>
)

Profile.propTypes = {
  onInputSubmit: PropTypes.func,
}

export default Profile
