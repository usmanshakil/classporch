import {
	GET_PROFILE_START,
	GET_PROFILE_SUCCESS,
	GET_PROFILE_FAIL,
	SET_PROFILE_ID,
	CHANGE_FIELD,
	TOGGLE_PROFILE_MODE,
	EDIT_PROFILE_START,
	EDIT_PROFILE_SUCCESS,
	EDIT_PROFILE_FAIL,
	CHANGE_EDUCATION,
	CHANGE_PICTURE,
	CHANGE_SKILLS,
	UPLOAD_PROFILE_PICTURE,
	UPLOAD_PROFILE_PICTURE_PROGRESS,
	UPLOAD_PROFILE_PICTURE_COMPLETE,
	UPLOAD_PROFILE_PICTURE_ERROR,
	GET_SEEDED_SKILLS_SUCCESS,
	GET_SEEDED_SKILLS_FAIL
} from './types'
import { apiEndpoints } from '../../ApiEndpoints'

const uuidv1 = require('uuid/v1')

export const uploadProfilePicture = (file, userId) => {
	return { type: UPLOAD_PROFILE_PICTURE, file, userId }
}

export const uploadProfilePictureProgress = progress => {
	return { type: UPLOAD_PROFILE_PICTURE_PROGRESS, progress }
}

export const uploadProfilePictureComplete = () => {
	return { type: UPLOAD_PROFILE_PICTURE_COMPLETE }
}

export const uploadProfilePictureError = error => {
	return { type: UPLOAD_PROFILE_PICTURE_ERROR, error }
}

export const setPresentProfile = ({ userId }) => {
	return { type: SET_PROFILE_ID, payload: userId }
}
export const getSeededSkills = (authToken) => {
	return async dispatch => {
		try {
			
			let rawRes = await fetch(
				`${apiEndpoints.base}/skills`,
				{
					headers: {
						'auth-token': authToken
					}
				}
			)
			
            let res = await rawRes.json()
			

			return dispatch({
				type: GET_SEEDED_SKILLS_SUCCESS,
				payload: res.skills
			})
		} catch (e) {
			return dispatch({ type: GET_SEEDED_SKILLS_FAIL, payload: e })
		}
	}
}
export const profileRequested = (userId, authToken) => {

	return async dispatch => {
		try {
			dispatch({ type: GET_PROFILE_START })
			let rawRes = await fetch(
				`${apiEndpoints.base}/user/${userId}/profile`,
				{
					headers: {
						'auth-token': authToken
					}
				}
			)
            let res = await rawRes.json()
			let tmp=[];
			res.data.attributes['educations-attributes'].forEach(function(item)
			{
				
				let newItem={};
				for(let key in item){
					let newKey=key.replace("-","_");
					
				if(key!="current-status") newItem[newKey]=item[key]
				else newItem[key]=item[key]
				}
				tmp.push(newItem)
			}
			)
			
			const averageRating = res.data.attributes['average-rating']
			const profile = res.data.attributes['profile']
			const educationalAttributes =tmp//res.data.attributes['educations-attributes']
			
			
			const reviews = res.data.attributes['reviews']
			   
			
			return dispatch({
				type: GET_PROFILE_SUCCESS,
				payload: {
					averageRating,
					educationalAttributes,
					profile,
					reviews
				}
			})
		} catch (e) {
			
			return dispatch({ type: GET_PROFILE_FAIL, payload: e })
		}
	}
}

export const toggleProfileMode = mode => {
	return {
		type: TOGGLE_PROFILE_MODE,
		payload: mode
	}
}

export const onChangeUserInfo = (field, value) => {
	return {
		type: CHANGE_FIELD,
		payload: { field, value }
	}
}

export const onChangeEducation = (
	index,
	action,
	educationalAttributes,
	field,
	value
) => {
	if (action === 'edit') {
		const updatedEducation = educationalAttributes.map((ed, i) => {
			if (i === index) {
				ed[field] = value
				return ed
			}
			return ed
		})
		return {
			type: CHANGE_EDUCATION,
			payload: updatedEducation
		}
	} else if (action === 'delete') {
		const updatedEducation = educationalAttributes.filter((ed, i) => {
			return i !== index
		})
		return {
			type: CHANGE_EDUCATION,
			payload: updatedEducation
		}
	} else {
		// noinspection JSUnusedAssignment
		if ((action = 'add')) {
			let updatedEducation = educationalAttributes
			if (index > educationalAttributes.length) {
				const newEducation = {
					'start_education': '',
					'finish_education': '',
					'university_name': ''
				}
				updatedEducation = [...updatedEducation, newEducation]
			}

			return {
				type: CHANGE_EDUCATION,
				payload: updatedEducation
			}
		} else {
			return {
				type: CHANGE_EDUCATION,
				payload: educationalAttributes
			}
		}
	}
}

export const onChangeSkill = editedSkills => {
	return {
		type: CHANGE_SKILLS,
		payload: editedSkills
	}
}

export const updateProfilePicture = picturePath => {
	return {
		type: CHANGE_PICTURE,
		payload: picturePath
	}
}

export const updateProfile = ({
	profile,
	userId,
	educationalAttributes,
	authToken
}) => {

	return async dispatch => {
		try {
			dispatch({ type: EDIT_PROFILE_START })

			let bodyObject = {
				user: {
					educations_attributes: educationalAttributes,
					role: profile.type,
					first_name: profile['full-name'].split(' ')[0],
					last_name: profile['full-name'].split(' ')[1],
					gender: profile.gender,
					'profile-picture': profile['profile-picture'],
					birthday_date: profile['birthday date'],
					country: profile.country,
					city: profile.city,
					number: profile.phone,
					email: profile.email,
					skills: profile['skill-ids']
				}
			}

			console.log(authToken)

			let resRaw = await fetch(`${apiEndpoints.base}/user/${userId}`, {
				method: 'PUT',
				headers: {
					'auth-token': authToken,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bodyObject)
			})
			if (resRaw.status !== 200) {
				throw 'failed request'
			}
			
			const res = await resRaw.json()
			
			const id = uuidv1()

			return dispatch({
				type: EDIT_PROFILE_SUCCESS,
				payload: {
					profileEditedIndicator: id,
					message: 'Your profile has been updated.'
				}
			})
		} catch (e) {
			const id = uuidv1()
			return dispatch({
				type: EDIT_PROFILE_FAIL,
				payload: {
					profileEditedIndicator: id,
					message:
						'Sorry. Your profile could not be updated. Please try again.'
				}
			})
		}
	}
}
