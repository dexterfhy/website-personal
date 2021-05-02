import { RobotOutlined } from '@ant-design/icons'
import { Avatar, Comment, Divider, Tooltip } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import profile from '../assets/me.png'
import user from '../assets/you.jpg'
import { FIRST_AGENT_REPLY_INTRODUCTION, MESSAGE_TYPES } from '../constants'
import LiveChatCommentEditor from './LiveChatCommentEditor'

const StyledComment = styled(Comment)`
  .ant-comment-inner {
    padding-top: 8px;
    padding-bottom: 8px;

    .ant-comment-content {
      padding-right: 42px;

      .ant-comment-actions {
        display: flex;
      }
    }
  }
`

const StyledDivider = styled(Divider)`
  && {
    margin-top: 12px;
    margin-bottom: 8px;
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

const buildComments = (props) => {
  const { replies, onCommentSubmit } = props

  return (
    <>
      {replies.map((reply, idx) => {
        const { text, date } = reply

        return (
          <Comment
            key={idx}
            author={
              reply.type === MESSAGE_TYPES.AGENT ? (
                <span>
                  Dexter "Not a Bot <RobotOutlined />" Fong
                </span>
              ) : (
                <span>You</span>
              )
            }
            avatar={
              reply.type === MESSAGE_TYPES.AGENT ? (
                <Avatar src={profile} alt="Dexter Fong" />
              ) : (
                <Avatar src={user} alt="You" />
              )
            }
            content={<StyledMessageBody>{text}</StyledMessageBody>}
            datetime={
              <Tooltip title={date}>
                <span>{moment().to(moment(date, 'YYYY-MM-DD HH:mm:ss'))}</span>
              </Tooltip>
            }
          />
        )
      })}
      <LiveChatCommentEditor onCommentSubmit={onCommentSubmit} />
    </>
  )
}

const LiveChatCommentTree = (props) => {
  const { mainMessage = {} } = props
  const { text, date } = mainMessage

  return (
    <StyledComment
      actions={[<span key="reply-to">Reply to</span>]}
      author={
        mainMessage ? (
          <span>
            Dexter "Not a Bot <RobotOutlined />" Fong
          </span>
        ) : null
      }
      avatar={<Avatar src={profile} alt="Dexter Fong" />}
      content={
        <StyledMessageBody>
          {FIRST_AGENT_REPLY_INTRODUCTION}
          <StyledDivider />
          {text}
        </StyledMessageBody>
      }
      datetime={
        <Tooltip title={date}>
          <span>{moment().to(moment(date, 'YYYY-MM-DD HH:mm:ss'))}</span>
        </Tooltip>
      }
    >
      {buildComments(props)}
    </StyledComment>
  )
}

LiveChatCommentTree.propTypes = {
  mainMessage: PropTypes.object,
  replies: PropTypes.array,
  onCommentSubmit: PropTypes.func,
}

export default LiveChatCommentTree
