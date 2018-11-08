import {apiEndpoints} from '../../ApiEndpoints';
import {browserHistory} from 'react-router';

import {
  GET_UNREAD_MESSAGES_COUNT,
  SET_UNREAD_MESSAGES_COUNT,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAIL,
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAIL,
  TUTOR_SESSION_REQUESTED,
  TUTOR_SESSION_REQUEST_SENT,
  TUTOR_SESSION_REQUEST_FAILED,
  SESSION_ACCEPT_START,
  SESSION_ACCEPT_SUCCESS,
  SESSION_ACCEPT_FAIL,
  SESSION_REJECT_START,
  SESSION_REJECT_SUCCESS,
  SESSION_REJECT_FAIL,
  ADD_MONEY_START,
  ADD_MONEY_SUCCESS,
  ADD_MONEY_FAIL,
  REQUEST_MONEY_START,
  REQUEST_MONEY_SUCCESS,
  REQUEST_MONEY_FAILED,
  REQUEST_ACCOUNT_LINK_START,
  REQUEST_ACCOUNT_LINK_SUCCESS,
  REQUEST_ACCOUNT_LINK_FAILED,
  UNSUBSCRIBE_DASHBOARD} from './types';
const uuidv1 = require('uuid/v1');

export const getUnreadMessagesCount = () => ({
  type: GET_UNREAD_MESSAGES_COUNT
});

export const setUnreadMessagesCount = (count) => ({
  type: SET_UNREAD_MESSAGES_COUNT,
  count
});

export const unsubscribeDashboard = () => ({
  type: UNSUBSCRIBE_DASHBOARD
});

export const getDashboard = ({userId, authToken}) => {
  return (dispatch) => {
    fetch(`${apiEndpoints.base}/user/${userId}/dashboard`, {
      headers: {
        'auth-token': authToken
      }
    })
      .then(raw => {
        if (raw.status !== 200) {
          throw('Request failed. Please try again.')
        }
        return raw.json()
      })
      .then(res => {
        console.log(res);
        const {profile, notifications} = res.data.attributes;
        const notificationsNextUrl = res.data.attributes['notifications-next-url'];
        const suggestedTutors = res.data.attributes['suggested-tutors'];
        const weekSchedule = res.data.attributes['week-schedule'];
        const nextWeekUrl = res.data.attributes['next-week-url'];
        return dispatch({
          type: GET_DASHBOARD_SUCCESS,
          payload: {profile, notifications, notificationsNextUrl, suggestedTutors, weekSchedule, nextWeekUrl}
        })
      })
      .catch(err => {
        console.log(err);
        return dispatch({
          type: GET_DASHBOARD_FAIL,
          payload: err
        })
      })
  }
};

export const fetchNotifications = (uri, authToken, userId) => {
  console.log(authToken);
  console.log(userId);
  return (dispatch) => {
    dispatch({type: FETCH_NOTIFICATIONS, payload: true});

    fetch(`${apiEndpoints.base}/user/${userId}/dashboard`, {
      headers: {
        'auth-token': authToken
      }
    })
      .then(raw => {
        console.log(raw);
        if (raw.status !== 200) {
          throw('Request failed. Please try again.')
        }
        return raw.json()
      })
      .then(res => {
        console.log(res.data);
        return dispatch({type: FETCH_NOTIFICATIONS_SUCCESS, payload: res.data})
      })
      .catch(err => {
        return dispatch({type: FETCH_NOTIFICATIONS_FAIL, payload: 'error extra'})
      })
  }
};

export const sessionRequested = ({tutorId, skill, authToken, sessionStartTime, sessionEndTime, amountPaid, userId}) => {
  return async (dispatch) => {
    try {
      dispatch({type: TUTOR_SESSION_REQUESTED});

      let bodyObject = {
        "tutor_id": tutorId,
        "skill": skill,
        "start_time": sessionStartTime.toString(),
        "end_time": sessionEndTime.toString()
      };
      console.log(bodyObject);
      console.log(authToken);
      console.log(JSON.stringify(bodyObject));
      let resRaw = await fetch(`${apiEndpoints.base}/session_requests/request/`, {
        method: "POST",
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject),

      });
      console.log(resRaw.status);
      if (resRaw.status !== 200) {
        // noinspection ExceptionCaughtLocallyJS
          throw('failed request')
      }
      let res = await resRaw.json();
      console.log(res);

      const {id: sessionId, profile} = res;
      const paymentBody = {
        "tutor_id": profile.id,
        "amount": parseFloat(amountPaid),
        "session_id": sessionId
      };
      console.log(paymentBody);
      let payRaw = await fetch(`${apiEndpoints.base}/users/${userId}/pay`, {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(paymentBody)
      });
      console.log(payRaw.status);
      if (payRaw.status !== 200) {
        throw('failed request')
      }
      let payRes = await payRaw.json();
      console.log(payRes);


      const id = uuidv1();
      return dispatch({
        type: TUTOR_SESSION_REQUEST_SENT,
        payload: {
          sessionRequestIndicator: id,
          message: 'Your session request has been sent'
        }
      })
    } catch (e) {
      console.log(e);
      const id = uuidv1();
      return dispatch({
        type: TUTOR_SESSION_REQUEST_FAILED,
        payload: {
          sessionRequestIndicator: id,
          message: 'Oops. Request not sent. Please try again.'
        }
      })
    }
  }
};

export const acceptSession = ({sessionId, authToken}) => {
  return async (dispatch) => {
    try {
      dispatch({type: SESSION_ACCEPT_START});

      let resRaw = await fetch(`${apiEndpoints.base}/session_requests/${sessionId}/accept`, {
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
      });
      if (resRaw.status !== 200) {
        throw('failed request')
      }
      const res = await resRaw.json();
      const id = uuidv1();
      console.log(res.data);
      return dispatch({
        type: SESSION_ACCEPT_SUCCESS,
        payload: {
          sessionRequestIndicator: id,
          message: "You've accepted the session request."
        }
      })
    } catch (e) {
      console.log(e);
      const id = uuidv1();
      return dispatch({
        type: SESSION_ACCEPT_FAIL,
        payload: {
          sessionRequestIndicator: id,
          message: 'Oops. Request not accepted. Please try again.'
        }
      })
    }
  }
};

export const rejectSession = ({sessionId, authToken}) => {
  return async (dispatch) => {
    try {
      dispatch({type: SESSION_REJECT_START});

      let resRaw = await fetch(`${apiEndpoints.base}/session_requests/${sessionId}/reject`, {
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
      });
      if (resRaw.status !== 200) {
        throw('failed request')
      }
      const res = await resRaw.json();
      const id = uuidv1();
      console.log(res.data);
      return dispatch({
        type: SESSION_REJECT_SUCCESS,
        payload: {
          sessionRequestIndicator: id,
          message: "You've rejected the session request."
        }
      })
    } catch (e) {
      console.log(e);
      const id = uuidv1();
      return dispatch({
        type: SESSION_REJECT_FAIL,
        payload: {
          sessionRequestIndicator: id,
          message: 'Oops. Request not rejected. Please try again.'
        }
      })
    }
  }
};


// export const addPaymentFields = ({ amountToBeAdded, stripeToken }) => {
//     return {
//         type:ADD_PAYMENT_FIELDS,
//         payload:{
//             amountToBeAdded,
//             stripeToken
//         }
//     }
// }

export const addMoneyToWallet = ({userId, authToken, amountToBeAdded, stripeToken, paymentType}) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_MONEY_START});

      let bodyObject = {
        amount: amountToBeAdded,
        stripe_token: stripeToken,
        payment_type: paymentType
      };
      console.log(bodyObject);
      let resRaw = await fetch(`${apiEndpoints.base}/users/${userId}/add_money`, {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
      });
      if (resRaw.status !== 200) {
        throw('failed request')
      }
      const res = await resRaw.json();
      const id = uuidv1();

      return dispatch({
        type: ADD_MONEY_SUCCESS,
        payload: {
          moneyAddedIndicator: id,
          message: 'Credits have been added to your wallet.'
        }
      })

    } catch (e) {
      console.log(e);
      const id = uuidv1();
      return dispatch({
        type: ADD_MONEY_FAIL,
        payload: {
          moneyAddedIndicator: id,
          message: 'Credits not added. Please try again.'
        }
      })
    }
  }
};

export const requestMoneyAction = ({userId, authToken, availableCredits, enteredCredits}) => {
  return async (dispatch) => {
    try {
      dispatch({type: REQUEST_MONEY_START});

      const id = uuidv1();

      if (availableCredits < enteredCredits) {
        return dispatch({
          type: REQUEST_MONEY_FAILED,
          payload: {
            requestMoneyIndicator: id,
            message: 'Not enough credits'
          }
        })
      }

      let bodyObject = {
        requested_amount: enteredCredits
      };
      let resRaw = await fetch(`${apiEndpoints.base}/users/${userId}/transact`, {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
      });

      if (resRaw.status !== 200) {
        throw('failed request')
      }
      console.log(resRaw);
      const res = await resRaw.json();
      console.log(res);
      return dispatch({
        type: REQUEST_MONEY_SUCCESS,
        payload: {
          requestMoneyIndicator: id,
          message: "Money has been requested successfully."
        }
      })
    } catch (e) {
      console.log(e);
      const id = uuidv1();
      return dispatch({
        type: REQUEST_MONEY_FAILED,
        payload: {
          requestMoneyIndicator: id,
          message: 'Oops. Money request failed. Please try again.'
        }
      })
    }
  }
};


export const requestLinkAccount = ({userId, authToken, bankName, ifscCode, accountHolderName, accountNumber}) => {
  return async (dispatch) => {
    try {
      dispatch({type: REQUEST_ACCOUNT_LINK_START});

      const id = uuidv1();

      let bodyObject = {
        "bank_name": bankName,
        "ifsc_code": ifscCode,
        "account_number": accountNumber,
        "account_holder_name": accountHolderName
      };
      // user/56/add_bank_details
      console.log(bodyObject);
      let resRaw = await fetch(`${apiEndpoints.base}/users/${userId}/add_bank_details`, {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
      });

      if (resRaw.status !== 200) {
        throw('failed request')
      }
      console.log(resRaw);
      const res = await resRaw.json();
      console.log(res);
      return dispatch({
        type: REQUEST_ACCOUNT_LINK_SUCCESS,
        payload: {
          accountLinkIndicator: id,
          message: "Bank account has been linked successfully."
        }
      })
    } catch (e) {
      console.log(e);
      const id = uuidv1();
      return dispatch({
        type: REQUEST_ACCOUNT_LINK_FAILED,
        payload: {
          accountLinkIndicator: id,
          message: 'Oops. Bank account link request failed. Please try again.'
        }
      })
    }
  }
};

