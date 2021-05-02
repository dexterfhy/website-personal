import { Form, Input, Button } from 'antd'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const { TextArea } = Input

const StyledButton = styled(Button)`
  && {
    background: #323d42;
    border-color: #323d42;
  }

  &&:hover {
    background: #77b6c6;
    border-color: #77b6c6;
  }
`

const StyledFormItem = styled(Form.Item)`
  && {
    margin-bottom: 12px;
  }
`

const LiveChatCommentEditor = (props) => {
  const [value, setValue] = useState('')
  const { onCommentSubmit } = props

  return (
    <>
      <StyledFormItem>
        <TextArea
          onChange={(e) => setValue(e.target.value)}
          rows={2}
          value={value}
        />
      </StyledFormItem>
      <StyledFormItem>
        <StyledButton
          type="primary"
          htmlType="submit"
          onClick={(e) => {
            onCommentSubmit(value)
            setValue('')
          }}
        >
          Reply
        </StyledButton>
      </StyledFormItem>
    </>
  )
}

LiveChatCommentEditor.propTypes = {
  onCommentSubmit: PropTypes.func,
}

export default LiveChatCommentEditor
