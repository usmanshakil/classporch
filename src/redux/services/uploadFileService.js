import Rx from 'rxjs/Rx';

const uploadFileService = (storageReference, file, metadata) => {
  return Rx.Observable.create(observer => {
    let uploadTask = storageReference.put(file, metadata);
    uploadTask.on('state_changed', (snapshot) => {
      observer.next(snapshot);
    }, (error) => {
      observer.error(error);
    }, () => {
      observer.next(uploadTask.snapshot);
      observer.complete();
    });
  });
};

export default uploadFileService;