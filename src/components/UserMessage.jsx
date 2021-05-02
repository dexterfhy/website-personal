import { Avatar, Comment, Tooltip } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import user from '../assets/you.jpg'

const StyledComment = styled(Comment)`
  .ant-comment-inner {
    display: flex;
    flex-direction: row-reverse;
    padding-top: 8px;
    padding-bottom: 8px;

    .ant-comment-avatar {
      margin-left: 12px;
      margin-right: 0px;
    }
    .ant-comment-content {
      padding-left: 42px;
    }
  }
  .ant-comment-content-author {
    justify-content: flex-end;
  }
  .ant-comment-content-detail {
    display: flex;
    justify-content: flex-end;
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

const UserMessage = (props) => {
  const { message = {} } = props
  const { text, date } = message

  return (
    <StyledComment
      author={<span>You</span>}
      avatar={<Avatar src={user} alt="You" />}
      content={<StyledMessageBody>{text}</StyledMessageBody>}
      datetime={
        <Tooltip title={date}>
          <span>{moment().to(moment(date, 'YYYY-MM-DD HH:mm:ss'))}</span>
        </Tooltip>
      }
    />
  )
}

UserMessage.propTypes = {
  message: PropTypes.object,
}

export default UserMessage
