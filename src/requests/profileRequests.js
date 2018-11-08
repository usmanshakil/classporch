import request from '../requests/index';

export class ProfileRequester {

    static profileRequested(userId) {
        return request(`/user/${userId}/profile`)
    }
}