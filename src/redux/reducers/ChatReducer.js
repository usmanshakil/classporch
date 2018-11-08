import {ChatActions} from '../actions';

const initState = {
  chats: [],
  error: null,
  isLoadingChats: true
};

const ChatReducer = (state = initState, action) => {
  switch (action.type) {
    case ChatActions.LOAD_CHATS:
      return {
        ...state,
        error: null,
        isLoadingChats: true
      };
    case ChatActions.CHATS_LOADED:
      return {
        ...state,
        chats: action.dataSource,
        isLoadingChats: false
      };
    case ChatActions.SHOW_ERROR_IN_CHATS:
      return {
        ...state,
        isLoadingChats: false,
        error: action.error
      };
    default:
      return state
  }
};

export default ChatReducer;