const ChatActions = {
  LOAD_CHATS: 'LOAD_CHATS',
  CHATS_LOADED: 'CHATS_LOADED',
  SHOW_ERROR_IN_CHATS: 'SHOW_ERROR_IN_CHATS',
  UNSUBSCRIBE_CHATS: 'UNSUBSCRIBE_CHATS',
  SHOW_MESSAGES: 'SHOW_MESSAGES',
  loadChats: () => ({
    type: ChatActions.LOAD_CHATS
  }),
  chatsLoaded: (dataSource) => ({
    type: ChatActions.CHATS_LOADED,
    dataSource
  }),
  showError: (error) => ({
    type: ChatActions.SHOW_ERROR_IN_CHATS,
    error
  }),
  unsubscribe: () => ({
    type: ChatActions.UNSUBSCRIBE_CHATS
  }),
  showMessages: (currentUser, otherUser, chatId) => ({
    type: ChatActions.SHOW_MESSAGES,
    currentUser,
    otherUser,
    chatId
  })
};

export default ChatActions;