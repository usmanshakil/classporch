import {saveState} from '../localStorage';
import {STATE_PERSISTED} from "../actions/types";
import {statePersisted} from '../actions';
import Rx from 'rxjs/Rx';

export const persistState = (action$, state, {}) => action$.filter(action => action.type !== STATE_PERSISTED).mergeMap(() => {
  saveState(state.getState());
  return Rx.Observable.of(statePersisted());
});