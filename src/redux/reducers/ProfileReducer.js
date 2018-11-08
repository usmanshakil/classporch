
import {
    GET_PROFILE_START,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    SET_PROFILE_ID,
    LOGOUT_USER_SUCCESS,
    CHANGE_FIELD,
    TOGGLE_PROFILE_MODE,
    EDIT_PROFILE_START,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL,
    CHANGE_EDUCATION,
    CHANGE_SKILLS,
    CHANGE_PICTURE,
    GET_SEEDED_SKILLS_SUCCESS,
	GET_SEEDED_SKILLS_FAIL
} from '../actions/types'

const INITIAL_STATE = {
    profile:{},
    presentProfileId:null,
    averageRating:null,
    educationalAttributes:[],
    reviews:[],
    loadingProfile:false,
    mode:'normal',
    editingProfile:false,
    editProfileMessage:'',
    profileEditedIndicator:null,
    seededSkills:[]
};

export default (state=INITIAL_STATE,action) => {
    console.log(state.educationalAttributes)
    switch(action.type){
        case GET_PROFILE_START:
            return { ...state, loadingProfile:true };
            
        case GET_PROFILE_SUCCESS:{
            const { profile,averageRating,educationalAttributes,reviews } = action.payload;
            return { ...state, profile, averageRating, educationalAttributes, reviews, loadingProfile:false }
        }
        case GET_PROFILE_FAIL:
            return { ...state, errorProfile:action.payload, loadingProfile:false };
        case GET_SEEDED_SKILLS_SUCCESS:{
            return { ...state,  seededSkills:action.payload}
        }
        case GET_SEEDED_SKILLS_FAIL:
            return { ...state, seededSkills:[] };


        case SET_PROFILE_ID:
            return { ...state, presentProfileId: action.payload };

        case LOGOUT_USER_SUCCESS:
            return { ...state = INITIAL_STATE };

        case TOGGLE_PROFILE_MODE:
            return { ...state, mode:action.payload  };
        
        case CHANGE_FIELD : {
            const { field,value } = action.payload;
            return { 
                ...state, 
                profile:{
                    ...state.profile,
                    [field] : value                     
                }
            }
        }

        case EDIT_PROFILE_START : 
            return { ...state, editingProfile:true };
        
        case EDIT_PROFILE_SUCCESS : 
            return { ...state, editingProfile:false, editProfileMessage:action.payload.message, profileEditedIndicator:action.payload.profileEditedIndicator  };

        case EDIT_PROFILE_FAIL:{
            return { ...state, editingProfile:false, editProfileMessage:action.payload.message, profileEditedIndicator:action.payload.profileEditedIndicator  }            
        }

        case CHANGE_EDUCATION:{
            return { ...state, educationalAttributes:action.payload }
        }

        case CHANGE_SKILLS : {
            return { ...state,
                    profile:{
                        ...state.profile,
                        'skill-ids': action.payload
                    }
            }
        }

        case CHANGE_PICTURE:{
            return {
                ...state, 
                profile:{
                    ...state.profile,
                    'profile-picture':action.payload
                }
            }
        }
        
        default:
            return state
    }
}
