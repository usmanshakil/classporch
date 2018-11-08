import Rx from 'rxjs/Rx';
import moment from 'moment';

const profilePictureService = (userId, file, {storage}) => {
  Rx.Observable.create(observer => {
    let taskSnapshot = storage.ref('profilePictures').child(`{userId}`).child(moment().format('x')).put(file)
      .on('state_changed', (snapshot) => {
        observer.next(snapshot);
      }, (error) => {
        observer.error(error);
      }, () => {
        observer.next(taskSnapshot);
        observer.complete();
      });
  });
};

export default profilePictureService;