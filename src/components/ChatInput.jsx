import { Input, Button } from 'antd'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import { MAX_INPUT_LENGTH } from '../constants'
import { SendOutlined } from '@ant-design/icons'

const StyledInput = styled(Input)`
    && {
        .ant-input-group-addon {
            padding: 0;
        }
import styled from 'styled-components';
    }
`

const ChatInput = (props) => {
  const [value, setValue] = useState('')
  const { onInputEnter, onInputClick, isDisabled } = props

  return (
    <StyledInput
      showCount
      maxLength={MAX_INPUT_LENGTH}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      onPressEnter={(e) => {
        setValue('')
        onInputEnter(e)
      }}
      value={value}
      placeholder="Feel free to say hi, or anything really."
      disabled={isDisabled}
      addonAfter={
        <Button
          icon={<SendOutlined />}
          size="default"
          onClick={(e) => {
            onInputClick(value)
            setValue('')
          }}
        />
      }
    />
  )
}

ChatInput.propTypes = {
  onInputEnter: PropTypes.func,
  onInputClick: PropTypes.func,
  isDisabled: PropTypes.bool,
}

export default ChatInput
