import React from 'react';
import {Grid, Label,Loader,Dimmer } from 'semantic-ui-react';
import './styles.css';
import {NotificationStrip} from './notification-strip';
import { connect } from 'react-redux';
import { fetchNotifications } from '../../../../redux/actions';

class NotificationsSection extends React.Component{

	state = {
		displayNotifications:[],
		allNotifications:[],
		displayMoreSegment:true,
		displayClickCount:1
	};

	componentWillMount(){
		const {notifications} = this.props;
		this.setState({ allNotifications: notifications, displayNotifications: notifications.slice(0,3) })
	}

	componentWillReceiveProps(nextProps){
		if(this.props.notifications !== nextProps.notifications){
			this.setState({
				allNotifications:nextProps.notifications,
				displayNotifications: nextProps.notifications.slice(0,3)

			})
		}

	}
	
	populateNotificationStrips = (notifications) => {
		const {userId, firstName, lastName, role, authToken} = this.props;
		return notifications.map( (notification,i) => {
			return <NotificationStrip notification = {notification} authToken={authToken} userId={userId} key = {i}
										firstName={firstName} lastName={lastName} role={role} />
		})
	};

	getMoreNotifications = () => {
		// fire an action to populate more notifications
		const { notificationsNextUrl, userId, authToken } = this.props;
		let { displayNotifications, allNotifications, displayClickCount } = this.state;
		const incrementedCount = 1 + displayClickCount;

		if(displayNotifications.length < allNotifications.length){
			return this.setState({
				displayNotifications:allNotifications.slice(0,3*incrementedCount),
				displayClickCount: incrementedCount
			})
		}
		this.props.fetchNotifications( notificationsNextUrl,authToken,userId )
	};

	displayMoreNotifications = (loading) => {
		if(loading){
			return (
				<Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
			)
		} else {
			return (
				<Label as='a' size='small' onClick={this.getMoreNotifications} >
		 				{ this.state.allNotifications.length? 'Show more notifications' : 'No notifications yet. Reload now?' }
				</Label>
			)
		}
	};

	render(){
		const { loading, notificationsNextUrl, userId, authToken } = this.props;
		const { displayNotifications, allNotifications } = this.state;
		return (
			<Grid className='tutor-notification-section'>
				<Grid.Row centered textAlign='left'>
					<Grid.Column width={12}>
						<p className='notifications-header'>Notifications</p>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row centered>
					<Grid.Column width={12} children= {this.populateNotificationStrips(displayNotifications) } >
						
					</Grid.Column>
				</Grid.Row>
				<Grid.Row centered columns={12}>
					<Grid.Column children= { this.displayMoreNotifications(loading, notificationsNextUrl,authToken,userId) } >
						
					</Grid.Column>
				</Grid.Row>
			</Grid>
			)
	}
}


const mapStateToProps = ( {dashboard,auth} ) => {
	let { authToken, id:userId, firstName, lastName, role } = auth;
	let { loading, notificationsNextUrl, notifications, profile } = dashboard;
	
	notifications = notifications.reverse();

	return { notifications, loading, notificationsNextUrl, userId, firstName, lastName, role, authToken }
};

export default connect(mapStateToProps, { fetchNotifications })(NotificationsSection);
