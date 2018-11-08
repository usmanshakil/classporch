
import React from 'react';
import { HeaderSection,ProfileSection } from './sections';
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Notification } from 'react-notification';
import { profileRequested,getDashboard, toggleProfileMode, onChangeUserInfo,onChangeEducation,onChangeSkill, updateProfile, toggleSearchMode } from '../../redux/actions';
import { Icon } from 'semantic-ui-react'
import {SearchResults} from '../search'
class ProfileStudent extends React.Component {

	state = {
		isNotificationActive:false,
		isProfileEditedNotificationActive:false,
	};

	componentDidMount(){
		const {presentProfileId,authToken} = this.props;
		this.props.profileRequested(presentProfileId,authToken);
		this.props.toggleProfileMode('normal')
		this.props.toggleSearchMode('normal')
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
		this.props.toggleSearchMode('normal')
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
	onCancelSearch = () => {
    this.props.toggleSearchMode('normal')
  };
    render(){
		
		const { userId,authToken,presentProfileId,role,firstName, profile, educationalAttributes, 
			averageRating, reviews,mode, onChangeEducation, onChangeSkill } = this.props;
        return (
        	<div>
        	  
        {
			this.props.searchMode === 'normal'?
			<div style={{width:'100%',display:'flex',flexDirection:'column', alignItems:'center' }}>
				<HeaderSection userId={userId} authToken={authToken} role={role} profile={profile} presentProfileId={presentProfileId} />
				

                <ProfileSection userId={userId} authToken={authToken} role={role} profile={profile} educationalAttributes={educationalAttributes}
								presentProfileId={presentProfileId} firstName={firstName} mode={ mode}
								toggleProfileMode={this.props.toggleProfileMode} onChangeUserInfo={this.props.onChangeUserInfo}
								onChangeEducation={this.props.onChangeEducation} onChangeSkill = {this.props.onChangeSkill} />
								

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
				:
				
				<div style={{  }} >
          <Icon name='delete' size='large' color='red' style={{ cursor:'pointer',position:'relative',left:'80%' }} 
                        onClick={this.onCancelSearch} />
          <SearchResults/>
        </div>}


				
        	</div>
        	);
    }
}

const mapStateToProps = ( {auth,profileState,dashboard,search} ) => {
	const { id:userId, authToken, role, firstName } =  auth;
	const { presentProfileId, profile, educationalAttributes, averageRating, 
			reviews, mode, editProfileMessage,profileEditedIndicator } = profileState;
	const { sessionRequestIndicator,displayMessage } = dashboard;
	const {searchMode} = search;
	

	return { userId, authToken,role,firstName, presentProfileId, profile, educationalAttributes, averageRating, reviews, mode,
		sessionRequestIndicator, displayMessage, searchMode  }
};

export default connect(mapStateToProps, { 
	profileRequested,
	getDashboard, 
	toggleProfileMode, 
	toggleSearchMode,
	onChangeUserInfo,
	onChangeUserInfo,
	onChangeSkill,
	onChangeEducation,
	updateProfile

})(ProfileStudent);

