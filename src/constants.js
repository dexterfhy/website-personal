export const BASE_SOCKET_URL = 'http://127.0.0.1:5000'
export const FRONTEND_REPO_URL = 'https://github.com/dexterfhy/website-personal'
export const BACKEND_REPO_URL = 'https://github.com/dexterfhy/backend-personal'
export const MAX_INPUT_LENGTH = 300
export const DEFAULT_TIMEOUT_MS = 1000 * 5
export const MESSAGE_TYPES = {
  BOT: 'BOT',
  USER: 'USER',
  AGENT: 'AGENT',
}
export const OPTION_TYPES = {
  DEFAULT: 'DEFAULT',
  URL: 'URL',
  TIMELINE: 'TIMELINE',
  IMAGE: 'IMAGE',
}
export const SOCKET_EVENTS = {
  MESSAGE: 'message',
  AGENT: 'agent',
  LIVE_CHAT: 'live-chat',
}
export const CUSTOM_EVENTS = {
  START_CONVERSATION_EVENT: 'START_CONVERSATION_EVENT',
  END_CONVERSATION_EVENT: 'END_CONVERSATION_EVENT',
  TELEGRAM_QUESTION_FEEDBACK_START_EVENT:
    'TELEGRAM_QUESTION_FEEDBACK_START_EVENT',
  TELEGRAM_QUESTION_FEEDBACK_CANCEL_EVENT:
    'TELEGRAM_QUESTION_FEEDBACK_CANCEL_EVENT',
}
export const FIRST_AGENT_REPLY_INTRODUCTION =
  'A wild Dexter has joined the chat! Continue the conversation by replying to this thread below.'
export const DEFAULT_BOT_ERROR_MESSAGE =
  "Oops, looks like I'm not available at the moment. Please try refreshing this page or coming back in a while :)"
