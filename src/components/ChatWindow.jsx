import { DeleteOutlined, SmileOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Card, Tooltip } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import profile from '../assets/me.png'
import {
  BACKEND_REPO_URL,
  DEFAULT_BOT_ERROR_MESSAGE,
  DEFAULT_TIMEOUT_MS,
  FRONTEND_REPO_URL,
  MESSAGE_TYPES,
  SOCKET_EVENTS,
} from '../constants'
import BotMessage from './BotMessage'
import ChatInput from './ChatInput'
import LiveChatCommentTree from './LiveChatCommentTree'
import UserMessage from './UserMessage'

const StyledChatWindow = styled(Card)`
  && {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .ant-card-head {
    height: 70px;

    .ant-card-head-wrapper {
      .ant-card-head-title {
        padding-bottom: 4px;
      }
      .ant-card-extra {
        position: absolute;
        right: 10px;
        top: 5px;
        padding-top: 0px;
      }
    }
  }
  .ant-card-body {
    padding: 0px;
    height: calc(
      100% - 104px
    ); /* 104 derived from height of StyledInputContainer 34px and .ant-card-head 70px */
    overflow-y: auto;
  }
`

const StyledMessageContainer = styled.div`
  && {
    text-align: center;
    position: relative;
  }

  @media only screen and (min-width: 0px) {
    padding: 24px 12px 0px 12px;
  }
  @media only screen and (min-width: 500px) {
    padding: 24px 24px 0px 24px;
  }
`

const StyledInputContainer = styled.div`
  && {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 34px;
  }
`

const StyledWindowTitleContainer = styled.div`
  && {
    display: flex;

    .ant-badge-dot {
      height: 12px;
      width: 12px;
      transform: translate(50%, -30%);
    }
  }
`

const StyledWindowTitleTextContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    text-align: justify;
    font-size: 1.1vw;
    font-weight: normal;
    margin-left: 10px;

    @media only screen and (min-width: 0px) {
      font-size: 3.1vw;
    }
    @media only screen and (min-width: 400px) {
      font-size: 2.7vw;
    }
    @media only screen and (min-width: 480px) {
      font-size: 2.3vw;
    }
    @media only screen and (min-width: 600px) {
      font-size: 1.8vw;
    }
    @media only screen and (min-width: 800px) {
      font-size: 1.35vw;
    }
    @media only screen and (min-width: 900px) {
      font-size: 1.25vw;
    }
    @media only screen and (min-width: 1100px) {
      font-size: 1.1vw;
    }
    @media only screen and (min-width: 1400px) {
      font-size: 0.95vw;
    }
    @media only screen and (min-width: 1600px) {
      font-size: 0.8vw;
    }
  }
`

const StyledExtraTitleContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`

const StyledClearButton = styled(Button)`
  && {
  }
`

class ChatWindow extends React.Component {
  messagesEndRef = React.createRef()

  componentDidMount() {
    this.registerSocketHandlers()
    this.scrollToBottom()
  }

  registerSocketHandlers() {
    const { socket, handleNewMessage, onAgentReply } = this.props

    socket.on(SOCKET_EVENTS.MESSAGE, (data) => {
      handleNewMessage(
        {
          ...data,
          date: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
        () => {}
      )
      this.scrollToBottom()
    })
    socket.on(SOCKET_EVENTS.AGENT, (data) =>
      onAgentReply(
        {
          ...data,
          date: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
        this.props.liveChatMessages.length === 0
          ? () => this.scrollToBottom()
          : () => {}
      )
    )
  }

  scrollToBottom() {
    if (this.messagesEndRef.current)
      this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  getTitle() {
    const { messages = [], millisElapsedSinceLastUserMessage } = this.props
    const millisElapsed = millisElapsedSinceLastUserMessage()
    const botHasNotRespondedInMoreThanTimeout =
      millisElapsed && millisElapsed > DEFAULT_TIMEOUT_MS
    const botRespondedWithErrorMessage =
      messages.length > 1 &&
      (messages[messages.length - 1].text === DEFAULT_BOT_ERROR_MESSAGE ||
        messages[messages.length - 2].text === DEFAULT_BOT_ERROR_MESSAGE)

    return (
      <StyledWindowTitleContainer>
        <Tooltip
          placement="bottom"
          title={
            messages.length > 0 &&
            (botHasNotRespondedInMoreThanTimeout ||
              botRespondedWithErrorMessage)
              ? 'Offline'
              : 'Online'
          }
        >
          <Badge
            dot
            size="default"
            status={
              messages.length > 0 &&
              (botHasNotRespondedInMoreThanTimeout ||
                botRespondedWithErrorMessage)
                ? 'default'
                : 'success'
            }
          >
            <Avatar
              size="large"
              shape="square"
              src={profile}
              alt="Dexter Fong"
            />
          </Badge>
        </Tooltip>
        <StyledWindowTitleTextContainer>
          <b>Dexter Fong</b>
          <p style={{ color: 'grey' }}>Ask me anything! Beep boop.</p>
        </StyledWindowTitleTextContainer>
      </StyledWindowTitleContainer>
    )
  }

  render() {
    const {
      messages,
      onInputSubmit,
      clearMessages,
      liveChatMessages,
      onUserReplyToAgent,
      millisElapsedSinceLastUserMessage,
    } = this.props
    const millisElapsed = millisElapsedSinceLastUserMessage()

    return (
      <StyledChatWindow
        title={this.getTitle()}
        extra={
          <StyledExtraTitleContainer>
            <span>
              <sup>
                <a target="_blank" href={FRONTEND_REPO_URL} rel="noreferrer">
                  Web
                </a>
                ,
                <a target="_blank" href={BACKEND_REPO_URL} rel="noreferrer">
                  Backend
                </a>
              </sup>
            </span>
            <StyledClearButton
              shape="round"
              size="small"
              icon={<DeleteOutlined />}
              onClick={(e) => clearMessages()}
            >
              Clear
            </StyledClearButton>
          </StyledExtraTitleContainer>
        }
      >
        <StyledMessageContainer>
          {messages.length === 0 ? (
            <Button
              shape="round"
              onClick={(e) => {
                e.preventDefault()
                onInputSubmit('Hello!', () => this.scrollToBottom())
              }}
            >
              Say 'Hello'!
              <SmileOutlined />
            </Button>
          ) : null}
          {messages.map((message, idx) => {
            const isLastBotMessage =
              idx === messages.length - 1 ||
              (idx === messages.length - 2 &&
                messages[messages.length - 1].type === MESSAGE_TYPES.AGENT)

            if (message.type === MESSAGE_TYPES.BOT) {
              return (
                <BotMessage
                  key={idx}
                  isLastMessage={isLastBotMessage}
                  submitUserOption={(text, optionalEvent) =>
                    onInputSubmit(
                      text,
                      () => this.scrollToBottom(),
                      optionalEvent ? optionalEvent : text
                    )
                  }
                  message={message}
                />
              )
            } else if (message.type === MESSAGE_TYPES.USER) {
              return <UserMessage key={idx} message={message} />
            } else if (message.type === MESSAGE_TYPES.AGENT) {
              return (
                <LiveChatCommentTree
                  key={idx}
                  mainMessage={message}
                  replies={
                    liveChatMessages.length > 1
                      ? liveChatMessages.slice(1, liveChatMessages.length)
                      : []
                  }
                  onCommentSubmit={onUserReplyToAgent}
                />
              )
            }
            return null
          })}
          {millisElapsed && millisElapsed < DEFAULT_TIMEOUT_MS ? (
            <BotMessage />
          ) : null}
          <div ref={this.messagesEndRef} />
        </StyledMessageContainer>
        <StyledInputContainer>
          <ChatInput
            onInputEnter={(e) => {
              e.preventDefault()
              onInputSubmit(e.target.value, () => this.scrollToBottom())
            }}
            onInputClick={(value) => {
              onInputSubmit(value, () => this.scrollToBottom())
            }}
            isDisabled={millisElapsed && millisElapsed < DEFAULT_TIMEOUT_MS}
          />
        </StyledInputContainer>
      </StyledChatWindow>
    )
  }
}

ChatWindow.propTypes = {
  onInputSubmit: PropTypes.func,
  socket: PropTypes.object,
  handleNewMessage: PropTypes.func,
  messages: PropTypes.array,
  clearMessages: PropTypes.func,
  onUserReplyToAgent: PropTypes.func,
  millisElapsedSinceLastUserMessage: PropTypes.func,
}

export default ChatWindow
