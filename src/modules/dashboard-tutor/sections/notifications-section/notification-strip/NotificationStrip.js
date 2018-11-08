import React,{Component} from 'react';
import {Grid, Image,Modal,Input,Button} from 'semantic-ui-react';
import './styles.css';
import {messageIconUnread} from '../../../../../assets/dashboard';
import moment from 'moment'
import faker from 'faker'
import {history} from '../../../../../redux/store';
import 'react-dates/lib/css/_datepicker.css';
import { connect } from 'react-redux'
import { acceptSession , fetchNotifications,rejectSession,ChatActions} from '../../../../../redux/actions'

class NotificationStrip extends Component {

	state = {
		modalVisible:false,
		dimmer:'blurring',
	};

	onNotificationClick = (e,data) => {
		this.setState({ modalVisible:true })			
	};

	rejectSession = () => {
		this.close();		
		const sessionId = this.props.notification.session.id;
		const { authToken, userId } = this.props;
		this.props.rejectSession({ sessionId,authToken });
		this.props.fetchNotifications( null,authToken,userId )
	};

	proceed = () => {
		this.close();		
		const sessionId = this.props.notification.session.id;
		const { authToken, userId } = this.props;
		this.props.acceptSession({ sessionId,authToken });
		this.props.fetchNotifications( null,authToken,userId )
		// accept or reject
	};


	onClickMessageIcon = () => {
		const currentUser = { 
			firstName: this.props.firstName, 
			lastName:this.props.lastName, 
			role:this.props.role, 
			id:this.props.userId 
		};
		const otherUser = { 
			firstName: this.props.notification.user["full-name"].split(' ')[0] , 
			lastName: this.props.notification.user["full-name"].split(' ')[1] , 
			role: 'student', 
			id: this.props.notification.user["id"] 
		};
		console.log(otherUser);
		console.log(currentUser);
		this.props.showMessages(currentUser,otherUser,null);
		history.push('/messages')
		
	};

	close = () => this.setState({ modalVisible:false });

	render(){
		const {modalVisible,dimmer} = this.state;
		const {notification} = this.props;
		const sessionEndTime = notification.session['end-time'];
		const sessionStartTime = notification.session['start-time'];
		
		const durationHrs = parseInt((sessionEndTime - sessionStartTime) / (1000*60*60));
		const date = moment(sessionStartTime).format('MMMM DD YYYY');
		const startTime = moment(sessionStartTime).format('HH mm A');

		const notificationText = (notification) => {
			if( notification["notif-type"].toLowerCase() === "requested" ){
				return notification.user["full-name"] + " requested a session for " + notification.skill.name
			}
			return "You " + notification["notif-type"] + " a " + notification.skill.name + " session from " + notification.user["full-name"]
		};

		return (
			<div>
			<Grid verticalAlign='middle'  className='notification-crumb' >
				<Grid.Row>
					<Grid.Column width={2}>
					<Image wrapped size='tiny' shape='circular'
							src={ notification.user['profile-picture']? notification.user['profile-picture']: faker.internet.avatar()} />
					</Grid.Column>
					<Grid.Column width={12} onClick={this.onNotificationClick} textAlign='left'>
						<Grid>
							<Grid.Row>
								<Grid.Column>
									<p className='notification-title'> 
										{notificationText(notification)}
									</p>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<p className='notification-subtitle'>  { moment(notification["created-at"]*1000).fromNow() }</p>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Grid.Column>
					<Grid.Column width={2}>
						<Image src={messageIconUnread} onClick={this.onClickMessageIcon} size='mini'/>
					</Grid.Column>
				</Grid.Row>
			</Grid>


			<Modal size={'small'} dimmer={dimmer} open={modalVisible} onClose={this.close} >
				<Modal.Header> Accept {notification.user['full-name']}'s request for a session ? </Modal.Header>
					<Modal.Content className='modal-layout' >
						<Image wrapped size='medium' shape='circular'
							src={ notification.user['profile-picture']? notification.user['profile-picture']: faker.internet.avatar()} />
						<div className='request-form'>
							<div className='request-section'>
								<div className='field'>Skill</div>
								<Input disabled className='value' defaultValue={notification.skill['name']} />
							</div>
							<div className='request-section'>
								<div className='field'>Start Date</div>
								<Input defaultValue={date} className='value' disabled />
							</div>
							<div className='request-section'>
								<div className='field'>Start Time</div>
								<Input defaultValue={startTime} className='value' disabled />
								
							</div>
							<div className='request-section'>
								<div className='field'>Session Duration</div>
								<Input defaultValue={durationHrs} disabled className='value' />
							</div>
						</div>
				</Modal.Content>
				<Modal.Actions>
					{ 
						notification["notif-type"] !== 'requested' ? 
							(<Button color='black' onClick={this.close}>
								Close
							</Button>)
							:
							(<div>
								<Button color='black' onClick={this.rejectSession}>
									Reject
								</Button>
								<Button positive onClick={this.proceed}>
									Accept 
								</Button>
							</div>)
					}
				</Modal.Actions>
			</Modal>

			</div>
			);
	}
}

export default connect(null, { acceptSession, fetchNotifications,rejectSession, showMessages:ChatActions.showMessages })(NotificationStrip)