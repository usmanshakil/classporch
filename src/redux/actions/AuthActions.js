import {apiEndpoints} from '../../ApiEndpoints';
import {history} from '../../redux/store';
import axios from 'axios'
import {deleteState} from '../localStorage';

import {
    STATE_PERSISTED,
    EMAIL_CHANGED,
    EMAIL_SUBMITTED,
    PASSWORD_CHANGED,
    CLOSE_PASSWORD_DIALOG,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT_USER_SUCCESS
} from './types'

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const emailSubmitted = (boolValue) => {
    return {
        type: EMAIL_SUBMITTED,
        payload: boolValue
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
};

export const passwordDialogClosed = (boolValue) => {
    return {
        type: CLOSE_PASSWORD_DIALOG,
        payload: boolValue
    }
};

export const statePersisted = () => {
    return {
        type: STATE_PERSISTED
    }
};

export const loginUser = (userReqObject) => {
    return async (dispatch) => {
        try {
            dispatch({type: LOGIN_USER});

            const res = await axios.post(apiEndpoints.auth.signIn, userReqObject);
            console.log(res);
            if (res.status !== 200) {
                throw('Please check your internet connection. A mouse may be chewing the wire.')
            }

            if (!res.data.success) {
                throw('Please enter correct username or password. We know you can do it. ')
            }

            const userResObject = {...res.data.user, ...res.data.session};
            dispatch({type: LOGIN_USER_SUCCESS, payload: {userResObject}});
            history.isAuth = true;
            history.push('/dashboard/' + res.data.user.role)

        } catch (e) {
            console.log('e', e);
            dispatch({type: LOGIN_USER_FAIL, payload: {errorMessage: e}});
            return history.push('/login')
        }
    }
};


export const signupUser = (parsedForm) => {
    console.log(parsedForm);
    console.log(JSON.stringify(parsedForm, null, 4));
    return async (dispatch) => {
        try {
            dispatch({type: SIGNUP_USER});

            const res = await axios.post(apiEndpoints.auth.signUp, parsedForm);
            console.log(res);
            if (res.status !== 200) {
                throw('Please check your internet connection. A mouse may be chewing the wire.')
            }

            if (!res.data.success) {
                throw("We couldn't sign you up this time. We'd be grateful if you'd try just once more")
            }

            const userResObject = {...res.data.user, ...res.data.session};

            if (res.data.user.role === 'tutor') {
                dispatch({type: SIGNUP_SUCCESS, payload: {userResObject}});
                return history.push('/dashboard/tutor')
            } else if (res.data.user.role === 'student') {
                dispatch({type: SIGNUP_SUCCESS, payload: {userResObject}});
                return history.push('/dashboard/student')
            } else {
                throw('Looks like the our intern slept while working. Please try again.')
            }
        } catch (e) {
            return dispatch({type: SIGNUP_FAIL, payload: {errorMessage: e}})
        }
    }
};

export const logoutUserRequested = () => {
    deleteState();
    return {
        type: LOGOUT_USER_SUCCESS,
        payload: ''
    }
};