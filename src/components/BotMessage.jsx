import { RobotOutlined } from '@ant-design/icons'
import { Avatar, Comment, Tooltip } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import TypingIndicator from '../assets/typing_indicator.gif'
import profile from '../assets/me.png'
import BotMessageOptions from './BotMessageOptions'

const StyledComment = styled(Comment)`
  .ant-comment-inner {
    padding-top: 8px;
    padding-bottom: 8px;

    .ant-comment-content {
      padding-right: 42px;
    }
  }
`

const StyledMessageBodyContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
  }
`

const StyledMessageBody = styled.p`
  && {
    text-align: justify;

    @media only screen and (min-width: 0px) {
      font-size: 3vw;
    }
    @media only screen and (min-width: 500px) {
      font-size: unset;
    }
  }
`

const StyledMessageButtonsContainer = styled.div`
  && {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
  }
`

const StyledTypingIndicator = styled.img`
  && {
    height: 40px;
  }
`

const BotMessage = (props) => {
  const { message = {}, isLastMessage, submitUserOption } = props
  const { options = {}, prompts = [], text, date } = message
  const { items = [] } = options

  return (
    <StyledComment
      author={
        message ? (
          <span>
            Dexter <RobotOutlined /> Bot <RobotOutlined />
          </span>
        ) : null
      }
      avatar={<Avatar src={profile} alt="Dexter Fong" />}
      content={
        text ? (
          <StyledMessageBodyContainer>
            <StyledMessageBody>{text}</StyledMessageBody>
            {items.length > 0 || prompts.length > 0 ? (
              <StyledMessageButtonsContainer>
                <BotMessageOptions
                  options={options}
                  isLastMessage={isLastMessage}
                  submitUserOption={submitUserOption}
                  prompts={prompts}
                />
              </StyledMessageButtonsContainer>
            ) : null}
          </StyledMessageBodyContainer>
        ) : (
          <StyledMessageBody>
            <StyledTypingIndicator src={TypingIndicator} alt="Typing..." />
          </StyledMessageBody>
        )
      }
      datetime={
        text ? (
          <Tooltip title={date}>
            <span>{moment().to(moment(date, 'YYYY-MM-DD HH:mm:ss'))}</span>
          </Tooltip>
        ) : null
      }
    />
  )
}

BotMessage.propTypes = {
  message: PropTypes.object,
  isLastMessage: PropTypes.bool,
  submitUserOption: PropTypes.func,
}

export default BotMessage
