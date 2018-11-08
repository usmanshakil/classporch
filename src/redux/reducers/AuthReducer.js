import { EMAIL_CHANGED,
		 EMAIL_SUBMITTED,
		 PASSWORD_CHANGED, 
		 CLOSE_PASSWORD_DIALOG,
		 LOGIN_USER_SUCCESS, 
		 LOGIN_USER_FAIL, 
		 LOGIN_USER,
		 SIGNUP_USER,
		 SIGNUP_SUCCESS,
		 SIGNUP_FAIL,
		 LOGOUT_USER_SUCCESS } from '../actions/types';

const INITIAL_STATE = { email: '',
						password: '', 
						showPasswordModal:false,
						userObject:{},
						errorMessage:'', 
						loading:false,
						loggedIn:false,
						authToken:'', 
						birthdayDate:'',
						city:'',
						country:'',
						createdAt:'',
						firstName:'',
						gender:'',
						id:'',
						image:'',
						lastName:'',
						number:'', 
						provider:'',
						role:'',
						uid:'',
						updatedAt:''
					 };

export default (state = INITIAL_STATE, action) => {
	switch(action.type){

		case EMAIL_CHANGED:
			return { ...state, email:action.payload };

		case EMAIL_SUBMITTED:
			return { ...state, showPasswordModal:action.payload, errorMessage:null };

		case PASSWORD_CHANGED:
			return { ...state, password:action.payload };

		case CLOSE_PASSWORD_DIALOG:
			return { ...state, showPasswordModal:action.payload };

		case LOGIN_USER:
			return { ...state, loading:true, errorObject:{}, errorMessage:null };

		case LOGIN_USER_SUCCESS:{
			const { auth_token, birthday_date,city,country,created_at,email,
				first_name,gender,id,image,last_name,number, provider,role,uid,updated_at } = action.payload.userResObject;

			return { ...state = INITIAL_STATE, loggedIn:true, authToken:auth_token, birthdayDate:birthday_date,city,country,
				createdAt:created_at,email,firstName:first_name,gender,id,image,lastName:last_name,number, 
				provider,role,uid,updatedAt:updated_at, errorMessage:null }
		}

		case LOGIN_USER_FAIL:
			// const { errorObject, user } = action.payload
			return { ...state = INITIAL_STATE, errorMessage: action.payload.errorMessage  };

		case SIGNUP_USER:
			return { ...state = INITIAL_STATE, loading:true };

		case SIGNUP_SUCCESS:{
			const { auth_token, birthday_date,city,country,created_at,email,
				first_name,gender,id,image,last_name,number, provider,role,uid,updated_at } = action.payload.userResObject;

			return { ...state = INITIAL_STATE, loggedIn:true, authToken:auth_token, birthdayDate:birthday_date,city,country,
				createdAt:created_at,email,firstName:first_name,gender,id,image,lastName:last_name,number, 
				provider,role,uid,updatedAt:updated_at, errorMessage:null }
		}

		case SIGNUP_FAIL:
			return { ...state = INITIAL_STATE, errorMessage: action.payload.errorMessage };

		case LOGOUT_USER_SUCCESS:
			return { ...state = INITIAL_STATE, errorMessage:null };

		default: 
			return state;
	}
}