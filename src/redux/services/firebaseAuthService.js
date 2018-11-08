import Rx from 'rxjs/Rx';

const verifyFirebaseAuth = ({auth}) => {
  if (auth.currentUser) {
    return Rx.Observable.of(true);
  }
  return Rx.Observable.fromPromise(auth.signInAnonymously())
    .mapTo(true)
    .catch(error => Rx.Observable.of(false));
};

export default verifyFirebaseAuth;