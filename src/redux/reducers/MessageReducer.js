import { ChatActions, MessageActions } from '../actions';

const initState = {
  chatId: null,
  otherUser: null,
  currentUser: null,
  error: null,
  messages: [],
  isLoadingMessages: false,
  isUploadingFile: false,
  uploadProgress: 0
};

const MessageReducer = ( state = initState, action) => {
  switch (action.type) {
    case MessageActions.FIND_CHAT:
      return {
        ...state,
        chatId: action.chatId
      };
    case MessageActions.MESSAGES_LOADED:
      return {
        ...state,
        messages: action.messages,
        error: null,
        isLoadingMessages: false
      };
    case ChatActions.SHOW_MESSAGES:
      return {
        ...state,
        currentUser: action.currentUser,
        otherUser: action.otherUser,
        chatId: action.chatId,
        error: null
      };
    case ChatActions.SHOW_ERROR_IN_MESSAGES:
      return {
        ...state,
        error: action.error,
        isUploadingFile: false
      };
    case MessageActions.UNSUBSCRIBE_MESSAGING:
      return initState;
    case MessageActions.SET_CHATID:
      return {
        ...state,
        chatId: action.chatId
      };
    case MessageActions.UPLOAD_FILE:
      return {
        ...state,
        isUploadingFile: true
      };
    case MessageActions.UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.progress
      };
    case MessageActions.FILE_UPLOADED:
      return {
        ...state,
        isUploadingFile: false
      };
    default:
      return state;
  }
};

export default MessageReducer;