import { WhatsAppOutlined } from '@ant-design/icons'
import { Button, Divider, Image, Timeline } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { OPTION_TYPES } from '../constants'

const StyledMainOptionsContainer = styled.div`
  && {
    display: flex;
    flex-wrap: wrap;
  }
`

const StyledPromptsContainer = styled.div`
  && {
    display: flex;
  }

  @media only screen and (min-width: 0px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media only screen and (min-width: 800px) {
    flex-direction: column;
  }
`

const StyledButton = styled(Button)`
  && {
    margin-bottom: 6px;
    margin-right: 6px;
  }
`

const StyledWhatsappButton = styled(Button)`
  && {
    background-color: #25d366;
    color: white;
  }

  :hover {
    border-color: unset;
  }
`

const StyledTimelineItem = styled(Timeline.Item)`
  && {
    display: flex;
    flex-direction: column;
    text-align: start;
    margin-top: 10px;
  }
`

const StyledDivider = styled(Divider)`
  && {
    margin-top: 4px;
    margin-bottom: 16px;
  }
`

const StyledOptionText = styled.p`
  && {
    @media only screen and (min-width: 0px) {
      font-size: 3vw;
    }
    @media only screen and (min-width: 500px) {
      font-size: unset;
    }
  }
`

const renderMainOptions = (props) => {
  const { options, isLastMessage, submitUserOption } = props
  const { type, items } = options

  if (type === OPTION_TYPES.DEFAULT && isLastMessage) {
    return renderDefaultButtons(items, submitUserOption)
  } else if (type === OPTION_TYPES.URL) {
    return renderUrlButtons(items)
  } else if (type === OPTION_TYPES.TIMELINE) {
    return renderTimeline(items)
  } else if (type === OPTION_TYPES.IMAGE) {
    return renderImages(items)
  }

  return null
}

const renderDefaultButtons = (items, submitUserOption) =>
  items.map((option) => (
    <StyledButton
      key={option.text}
      shape="round"
      onClick={(e) => {
        e.preventDefault()
        submitUserOption(option.text, option.payload)
      }}
    >
      <StyledOptionText>{option.text}</StyledOptionText>
    </StyledButton>
  ))

const renderUrlButtons = (items) =>
  items.map((option) => {
    if ('Whatsapp' === option.text) {
      return (
        <StyledWhatsappButton
          key={option.text}
          icon={<WhatsAppOutlined style={{ marginRight: '8px' }} />}
          shape="round"
        >
          {
            <a
              target="_blank"
              href={option.url}
              rel="noreferrer"
              style={{ color: 'inherit' }}
            >
              {option.text}
            </a>
          }
        </StyledWhatsappButton>
      )
    }

    return (
      <StyledButton key={option.text} type="primary" shape="round">
        {
          <a target="_blank" href={option.url} rel="noreferrer">
            <StyledOptionText>{option.text}</StyledOptionText>
          </a>
        }
      </StyledButton>
    )
  })

const renderTimeline = (items) => (
  <Timeline>
    {items.map((option) => (
      <StyledTimelineItem key={option.text}>
        <b>
          <StyledOptionText>{option.date}</StyledOptionText>
        </b>
        <p>
          <StyledOptionText>{option.text}</StyledOptionText>
        </p>
      </StyledTimelineItem>
    ))}
  </Timeline>
)

const renderImages = (items) =>
  items.map((option) => <Image width="33%" height="auto" src={option.url} />)

const BotMessageOptions = (props) => {
  const { prompts = [], isLastMessage, submitUserOption } = props

  return (
    <>
      <StyledMainOptionsContainer>
        {renderMainOptions(props)}
      </StyledMainOptionsContainer>
      {isLastMessage && prompts.length > 0 ? (
        <>
          <StyledDivider />
          <StyledPromptsContainer>
            {renderDefaultButtons(prompts, submitUserOption)}
          </StyledPromptsContainer>
        </>
      ) : null}
    </>
  )
}

BotMessageOptions.propTypes = {
  options: PropTypes.object,
  isLastMessage: PropTypes.bool,
  submitUserOption: PropTypes.func,
}

export default BotMessageOptions
