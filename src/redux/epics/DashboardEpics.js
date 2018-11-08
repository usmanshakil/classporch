import {GET_UNREAD_MESSAGES_COUNT, UNSUBSCRIBE_DASHBOARD} from '../actions/types';
import {setUnreadMessagesCount, } from '../actions';
import {verifyFirebaseAuth} from '../services';
import Rx from 'rxjs/Rx';

export const getUnreadMessageCount = (action$, state, {auth, firestore}) => action$
  .ofType(GET_UNREAD_MESSAGES_COUNT).switchMap(() => {
    return verifyFirebaseAuth({auth}).switchMap(() => {
      const currentDashboardState = state.getState().dashboard;
      const ref = currentDashboardState.profile.type === 'student' ?
        firestore.collection('messages').where('student.id','==', currentDashboardState.profile.id) :
        firestore.collection('messages').where('tutor.id','==', currentDashboardState.profile.id);
      return Rx.Observable.fromPromise(ref.get())
        .map(querySnapshot => setUnreadMessagesCount(querySnapshot.docs.length));
    })
    .takeUntil(action$.ofType(UNSUBSCRIBE_DASHBOARD))
    .catch(error => Rx.Observable.of(setUnreadMessagesCount(0)));
  });