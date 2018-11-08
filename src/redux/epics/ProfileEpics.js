import {uploadProfilePictureProgress, uploadProfilePictureComplete, uploadProfilePictureError} from '../actions';
import {UPLOAD_PROFILE_PICTURE} from "../actions/types";
import {verifyFirebaseAuth, profilePictureService} from '../services';

export const uploadFileWithProgress = (action$, state, {auth, storage}) => action$.ofType(UPLOAD_PROFILE_PICTURE)
    .mergeMap(action => {
        return verifyFirebaseAuth({auth}).switchMap(status => {
            profilePictureService(action.userId, action.file, {storage})
                .map(taskSnapshot => {
                    let progress = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
                    return progress === 100 ? uploadProfilePictureComplete() : uploadProfilePictureProgress(progress);
                }).catch(error => uploadProfilePictureError(error))
        });
    });