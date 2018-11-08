
import React from 'react';
import { HeaderSection,RatingSection,ReviewsSection,ProfileSection } from './sections';
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Notification } from 'react-notification';
import { profileRequested,getDashboard, toggleProfileMode, onChangeUserInfo,updateProfilePicture,
	onChangeEducation,onChangeSkill, updateProfile, ChatActions } from '../../redux/actions';

class ProfileTutor extends React.Component {

	state = {
		isNotificationActive:false,
		isProfileEditedNotificationActive:false,
	};

	componentDidMount(){
		const {presentProfileId,authToken} = this.props;
		this.props.profileRequested(presentProfileId,authToken);
		this.props.toggleProfileMode('normal')
	}

	componentWillReceiveProps(nextProps){
		const { userId, authToken } = this.props;
		
		if(this.props.sessionRequestIndicator !== nextProps.sessionRequestIndicator){
			this.setState({ isNotificationActive:true });
			this.props.getDashboard({ userId,authToken })			
		}
		if(this.props.profileEditedIndicator !== nextProps.profileEditedIndicator){
			this.setState({ isProfileEditedNotificationActive:true })
		}
		
	}

	componentWillUmount(){
		this.props.toggleProfileMode('normal')
	}

	dismissNotification = () => {
		this.setState({ isNotificationActive :false })
	};

	dismissNotificationEdit = () => {
		this.setState({ isProfileEditedNotificationActive :false })
	};

	onClickSave = () =>  {
		const { userId, profile, authToken, educationalAttributes } = this.props;
		this.props.toggleProfileMode('normal');
		this.props.updateProfile({ profile,userId,educationalAttributes,authToken })
	};

    render(){
		const { userId,authToken,presentProfileId,role,firstName, profile, educationalAttributes, lastName ,
			averageRating, reviews,mode, onChangeEducation, onChangeSkill } = this.props;
        return (
        	<div style={{width:'100%',display:'flex',flexDirection:'column', alignItems:'center' }} >
				<HeaderSection userId={userId} authToken={authToken} profile={profile} presentProfileId={presentProfileId}
								role= {role} lastName = {lastName} firstName={firstName} showMessages={this.props.showMessages}
								updateProfilePicture={updateProfilePicture} />
				
                <RatingSection userId={userId} authToken={authToken} firstName={firstName} role={role} 
								profile={profile} presentProfileId={presentProfileId} averageRating = {averageRating}  />

                <ReviewsSection userId={userId} authToken={authToken} role={role} profile={profile}  presentProfileId={presentProfileId}
								reviews = {reviews}  />

                <ProfileSection userId={userId} authToken={authToken} role={role} profile={profile} educationalAttributes={educationalAttributes}
								presentProfileId={presentProfileId} firstName={firstName} mode={ mode}
								toggleProfileMode={this.props.toggleProfileMode} onChangeUserInfo={this.props.onChangeUserInfo}
								onChangeEducation={this.props.onChangeEducation} onChangeSkill = {this.props.onChangeSkill}
								/>

				{ mode==='edit' ? 
					<Button color='yellow' style={{marginBottom:'100px'}} onClick={this.onClickSave} >
						SAVE CHANGES
					</Button>
					: 
					null }

				<Notification
					isActive={this.state.isNotificationActive}
					message="Notification"
					action="Dismiss"
					title={this.props.displayMessage}
					dismissAfter =  {5000}
					onDismiss={ this.dismissNotification }
					onClick={ this.dismissNotification }
				/>

				<Notification
					isActive={this.state.isProfileEditedNotificationActive}
					message="Notification"
					action="Dismiss"
					title={this.props.editProfileMessage}
					dismissAfter =  {5000}
					onDismiss={ this.dismissNotificationEdit }
					onClick={ this.dismissNotificationEdit }
				/>


				
        	</div>
        	);
    }
}

const mapStateToProps = ( {auth,profileState,dashboard} ) => {
	const { id:userId, authToken, role, firstName, lastName } =  auth;
	const { presentProfileId, profile, educationalAttributes, averageRating, 
			reviews, mode } = profileState;
	const { sessionRequestIndicator,displayMessage } = dashboard;
	

	return { userId, authToken,role,firstName, lastName, presentProfileId, profile, educationalAttributes, averageRating, reviews, mode,
		sessionRequestIndicator, displayMessage  }
};

export default connect(mapStateToProps, { 
	profileRequested,
	getDashboard, 
	toggleProfileMode, 
	onChangeUserInfo,
	onChangeSkill,
	onChangeEducation,
	updateProfile,
	updateProfilePicture,
	showMessages: ChatActions.showMessages
})(ProfileTutor);

