import moment from 'moment'
import React from 'react'
import socketIOClient from 'socket.io-client'
import styled from 'styled-components'
import {
  BASE_SOCKET_URL,
  CUSTOM_EVENTS,
  MESSAGE_TYPES,
  SOCKET_EVENTS,
  DEFAULT_BOT_ERROR_MESSAGE,
  DEFAULT_TIMEOUT_MS,
} from '../constants'
import ChatWindow from './ChatWindow'
import Profile from './Profile'

const StyledContainer = styled.div`
  && {
    width: 100%;
    height: 100%;
    display: flex;

    @media only screen and (min-width: 0px) {
      flex-direction: column;
    }
    @media only screen and (min-width: 800px) {
      flex-direction: row;
    }
  }
`

const StyledProfileContainer = styled.div`
  && {
    padding: 36px;
    background-color: #323d40;
    color: white;

    @media only screen and (min-width: 0px) {
      min-width: 100%;
      max-height: 50%;
      padding: 0px 18px 0px 18px;
    }
    @media only screen and (min-width: 800px) {
      min-width: 50%;
      min-height: 100%;
      padding: 0px 36px 0px 36px;
    }
    @media only screen and (min-width: 1200px) {
      min-width: 60%;
      min-height: 100%;
    }
  }
`

const StyledChatContainer = styled.div`
  && {
    padding: 36px;

    @media only screen and (min-width: 0px) {
      min-width: 100%;
      min-height: 50%;
      height: 100%;
      padding: 0px;
    }
    @media only screen and (min-width: 800px) {
      min-width: 50%;
      min-height: 100%;
    }
    @media only screen and (min-width: 1200px) {
      min-width: 40%;
      min-height: 100%;
    }
  }
`

const ONE_SECOND_MS = 1000
const socket = socketIOClient(BASE_SOCKET_URL)

class ChatContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      interval: 0,
      messages: [],
      liveChatMessages: [],
    }

    this.handleNewMessage = this.handleNewMessage.bind(this)
    this.onInputSubmit = this.onInputSubmit.bind(this)
    this.onAgentReply = this.onAgentReply.bind(this)
    this.onUserReplyToAgent = this.onUserReplyToAgent.bind(this)
    this.clearMessages = this.clearMessages.bind(this)
    this.millisElapsedSinceLastUserMessage = this.millisElapsedSinceLastUserMessage.bind(
      this
    )

    setInterval(() => {
      this.setState({ interval: this.state.interval + 1 }, () => {
        const millisElapsed = this.millisElapsedSinceLastUserMessage()

        if (millisElapsed && millisElapsed > DEFAULT_TIMEOUT_MS) {
          this.handleNewMessage(this.buildErrorBotMessage(), () => {})
        }
      })
    }, ONE_SECOND_MS)
  }

  handleNewMessage(newMessage, callback) {
    this.setState(
      {
        messages: [...this.state.messages, newMessage],
      },
      callback
    )
  }

  clearMessages() {
    this.setState(
      {
        messages: [],
        liveChatMessages: [],
      },
      () =>
        socket.emit(SOCKET_EVENTS.MESSAGE, CUSTOM_EVENTS.END_CONVERSATION_EVENT)
    )
  }

  onInputSubmit(text, callback, event) {
    if (text) {
      this.handleNewMessage(this.buildUserMessage(text), callback)
      socket.emit(SOCKET_EVENTS.MESSAGE, event ? event : text)
    }
  }

  onAgentReply(newMessage, callback) {
    const { messages, liveChatMessages } = this.state

    this.setState(
      {
        //Only add new message to main message history if it's the first reply from agent
        messages:
          liveChatMessages.length === 0
            ? [...messages, newMessage]
            : [...messages],
        liveChatMessages: [...liveChatMessages, newMessage],
      },
      callback
    )
  }

  onUserReplyToAgent(text) {
    if (text) {
      this.setState({
        liveChatMessages: [
          ...this.state.liveChatMessages,
          this.buildUserMessage(text),
        ],
      })
      socket.emit(SOCKET_EVENTS.LIVE_CHAT, text)
    }
  }

  millisElapsedSinceLastUserMessage() {
    const { messages = [] } = this.state

    if (
      messages.length > 0 &&
      messages[messages.length - 1].type === MESSAGE_TYPES.USER
    ) {
      return moment().diff(
        moment(messages[messages.length - 1].date, 'YYYY-MM-DD HH:mm:ss')
      )
    }
    return null
  }

  buildErrorBotMessage() {
    return {
      type: MESSAGE_TYPES.BOT,
      text: DEFAULT_BOT_ERROR_MESSAGE,
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
  }

  buildUserMessage(text) {
    return {
      type: MESSAGE_TYPES.USER,
      text: text,
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
  }

  render() {
    return (
      <StyledContainer>
        <StyledProfileContainer>
          <Profile onInputSubmit={this.onInputSubmit} />
        </StyledProfileContainer>
        <StyledChatContainer>
          <ChatWindow
            socket={socket}
            messages={this.state.messages}
            liveChatMessages={this.state.liveChatMessages}
            handleNewMessage={this.handleNewMessage}
            clearMessages={this.clearMessages}
            onInputSubmit={this.onInputSubmit}
            onAgentReply={this.onAgentReply}
            onUserReplyToAgent={this.onUserReplyToAgent}
            millisElapsedSinceLastUserMessage={
              this.millisElapsedSinceLastUserMessage
            }
            buildUserMessage={this.buildUserMessage}
          />
        </StyledChatContainer>
      </StyledContainer>
    )
  }
}

ChatContainer.propTypes = {}

export default ChatContainer
