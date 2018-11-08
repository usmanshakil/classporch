const MessageActions = {
  FIND_CHAT: 'FIND_CHAT',
  SET_CHATID: 'SET_CHATID',
  LOAD_MESSAGES: 'LOAD_MESSAGES',
  MESSAGES_LOADED: 'MESSAGES_LOADED',
  SHOW_ERROR_IN_MESSAGES: 'SHOW_ERROR_IN_MESSAGES',
  SEND_MESSAGE: 'SEND_MESSAGE',
  MESSAGE_SENT: 'MESSAGE_SENT',
  UPLOAD_FILE: 'UPLOAD_FILE_MESSAGING',
  FILE_UPLOADED: 'FILE_UPLOADED_MESSAGING',
  UPLOAD_PROGRESS: 'UPLOAD_PROGRESS_MESSAGING',
  UNSUBSCRIBE_MESSAGING: 'UNSUBSCRIBE_MESSAGING',
  findChat: () => ({
    type: MessageActions.FIND_CHAT
  }),
  setChatId: (chatId) => ({
    type: MessageActions.SET_CHATID,
    chatId
  }),
  loadMessages: (chatId) => ({
    type: MessageActions.LOAD_MESSAGES
  }),
  messagesLoaded: (messages) => ({
    type: MessageActions.MESSAGES_LOADED,
    messages
  }),
  showError: (error) => ({
    type: MessageActions.SHOW_ERROR_IN_MESSAGES,
    error
  }),
  sendMessage: (message, messageType = 'TEXT') => ({
    type: MessageActions.SEND_MESSAGE,
    message,
    messageType
  }),
  messageSent: () => ({
    type: MessageActions.MESSAGE_SENT
  }),
  uploadFile: (file, metadata) => ({
    type: MessageActions.UPLOAD_FILE,
    file,
    metadata
  }),
  uploadProgress:(progress) => ({
    type: MessageActions.UPLOAD_PROGRESS,
    progress
  }),
  fileUploaded: (downloadURL) => ({
    type: MessageActions.FILE_UPLOADED,
    downloadURL
  }),
  unsubscribe: () => ({
    type: MessageActions.UNSUBSCRIBE_MESSAGING
  })
};

export default MessageActions;