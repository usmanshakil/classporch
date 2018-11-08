import {MessageActions} from '../actions';
import {verifyFirebaseAuth, uploadFileService} from '../services';
import Rx from 'rxjs/Rx';
import moment from 'moment';

const MessageType = {
  TEXT: 'TEXT',
  FILE: 'FILE'
};

export const findChat = (action$, state, {auth, firestore}) => action$.ofType(MessageActions.FIND_CHAT)
  .switchMap(() => {
    const currentState = state.getState().messageReducer;
    const {currentUser, otherUser} = currentState;
    return verifyFirebaseAuth({auth}).switchMap(() => {
      return Rx.Observable.fromPromise(firestore.collection('chats')
        .where('student.id', '==', currentUser.role === 'student' ? currentUser.id : otherUser.id)
        .where('tutor.id', '==', currentUser.role === 'tutor' ? currentUser.id : otherUser.id)
        .limit(1).get())
        .map(querySnapshot => {
          return querySnapshot.docs[0] ? querySnapshot.docs[0].id : null
        })
        .map(chatId => MessageActions.setChatId(chatId))
        .catch(error => Rx.Observable.of(MessageActions.showError(error)));
    });
  });

export const loadMessages = (action$, state, {auth, firestore}) => action$
  .filter(action => {
    return action.type === MessageActions.LOAD_MESSAGES || action.type === MessageActions.SET_CHATID
  })
  .switchMap((action) => {
    const currentState = state.getState().messageReducer;
    return verifyFirebaseAuth({auth}).switchMap(() => {
      if (currentState.chatId) {
        return loadMessagesWith(currentState.chatId, {firestore})
      } else if (action.chatId) {
        return loadMessagesWith(action.chatId, {firestore})
      } else if (action.chatId === null) {
        return Rx.Observable.of(MessageActions.messagesLoaded([]))
      } else {
        return Rx.Observable.of(MessageActions.findChat());
      }
    })
      .takeUntil(action$.ofType(MessageActions.UNSUBSCRIBE_MESSAGING))
      .catch(error => Rx.Observable.of(MessageActions.showError(error.message)));
  });

export const sendMessage = (action$, state, {auth, firestore, serverTime}) => action$.ofType(MessageActions.SEND_MESSAGE)
  .switchMap(action => {
    const currentState = state.getState().messageReducer;
    return verifyFirebaseAuth({auth}).switchMap(() => {
      if (currentState.chatId) {
        return writeMessage(currentState.chatId, action.message, action.messageType, currentState.currentUser, {firestore, serverTime})
          .switchMap(() => {
            return updateChat(action.message, currentState.chatId, currentState.currentUser, {firestore, serverTime})
          });
      } else {
        return createChat(action.message, currentState.currentUser, currentState.otherUser, {firestore, serverTime})
          .switchMap(ref => {
            return writeMessage(ref.id, action.message, action.messageType, currentState.currentUser, {firestore, serverTime})
          });
      }
    })
      .map(() => MessageActions.messageSent())
      .takeUntil(action$.ofType(MessageActions.UNSUBSCRIBE_MESSAGING))
      .catch(error => Rx.Observable.of(MessageActions.showError(error.message)));
  });

export const uploadFile = (action$, state, {auth, storage}) => action$.ofType(MessageActions.UPLOAD_FILE)
  .switchMap(action => {
    const currentState = state.getState().messageReducer;
    return verifyFirebaseAuth({auth}).switchMap(() => {
        let ref = storage.ref().child('sharedFiles').child(`${currentState.currentUser.id}`).child(`${currentState.otherUser.id}`).child(moment().format('x'));
        return uploadFileService(ref, action.file, action.metadata);
      })
      .map((snapshot) => {
        if (snapshot.downloadURL) {
          return MessageActions.fileUploaded(snapshot.downloadURL);
        } else {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          return MessageActions.uploadProgress(parseInt(progress, 10));
        }
      })
      .takeUntil(action$.ofType(MessageActions.UNSUBSCRIBE_MESSAGING))
      .catch(error => Rx.Observable.of(MessageActions.showError(error.message)));
  });

// eslint-disable-next-line
export const shareFile = (action$, state, {}) => action$.ofType(MessageActions.FILE_UPLOADED)
  .switchMap(action => {
    return Rx.Observable.of(MessageActions.sendMessage(action.downloadURL, MessageType.FILE));
  });

const loadMessagesWith = (chatId, {firestore}) => {
  return Rx.Observable.create(observer => {
    firestore.collection('messages')
      .where('chatId', '==', chatId)
      .orderBy('createdAt', 'asc')
      .onSnapshot((snapshot) => {
        observer.next(snapshot)
      }, (error) => {
        observer.error(error)
      })
  })
    .map(snapshot => {
      return snapshot.docs.map(doc => {
        return {
          key: doc.id,
          text: doc.data().message,
          type: doc.data().type,
          createdAt: doc.data().createdAt,
          sentBy: doc.data().sentBy
        }
      });
    })
    .map(dataSource => MessageActions.messagesLoaded(dataSource));
};

const writeMessage = (chatId, message, messageType, currentUser, {firestore, serverTime}) => {
  return Rx.Observable.fromPromise(firestore.collection('messages')
    .add({
      chatId: chatId,
      createdAt: serverTime,
      updatedAt: serverTime,
      message: message,
      type: messageType,
      sentBy: currentUser.role,
    }));
};


const createChat = (message, currentUser, otherUser, {firestore, serverTime}) => {
  return Rx.Observable.fromPromise(firestore.collection('chats')
    .add({
      createdAt: serverTime,
      lastMessageCreatedAt: serverTime,
      lastMessage: message,
      lastMessageSentBy: currentUser.role,
      student: currentUser.role === 'student' ? currentUser : otherUser,
      tutor: currentUser.role === 'tutor' ? currentUser : otherUser,
      seenByTutor: currentUser.role === 'tutor',
      seenByStudent: currentUser.role === 'student'
    }));
};

const updateChat = (message, chatId, currentUser, {firestore, serverTime}) => {
  return Rx.Observable.fromPromise(firestore.collection('chats').doc(chatId)
    .update({
      lastMessageCreatedAt: serverTime,
      lastMessage: message,
      lastMessageSentBy: currentUser.role,
      seenByTutor: currentUser.role === 'tutor',
      seenByStudent: currentUser.role === 'student'
    }));
};