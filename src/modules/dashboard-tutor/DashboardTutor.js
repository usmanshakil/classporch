import React, {Component} from 'react';
import {NotificationsSection, StatsSection, WeekScheduleSection} from './sections';
import {connect} from 'react-redux';
import {Notification} from 'react-notification';
import {getDashboard, getUnreadMessagesCount} from '../../redux/actions';

class DashboardTutor extends Component {

  state = {
    isNotificationActive: false,
    unreadMessageCount: 0
  };

  componentDidMount() {
    const {userId, authToken} = this.props;
    this.props.getDashboard({userId, authToken});
    this.props.getUnreadMessagesCount();
  }

  componentWillReceiveProps(nextProps) {
    const {userId, authToken, unreadMessageCount} = this.props;

    if (this.props.sessionRequestIndicator !== nextProps.sessionRequestIndicator) {
      this.setState({isNotificationActive: true});
      this.props.getDashboard({userId, authToken})
    }

    this.setState({unreadMessageCount: unreadMessageCount});
  }

  dismissNotification = () => {
    this.setState({isNotificationActive: false})
  };

  render() {
    const {unreadMessageCount} = this.state;
    return (
      <div>
        <StatsSection unreadMessageCount={unreadMessageCount}/>
        <NotificationsSection/>
        <WeekScheduleSection/>
        <Notification
          isActive={this.state.isNotificationActive}
          message="Notification"
          action="Dismiss"
          title={this.props.displayMessage}
          dismissAfter={5000}
          onDismiss={this.dismissNotification}
          onClick={this.dismissNotification}
        />
      </div>
    );
  }
}

const mapStateToProps = ({auth, dashboard}) => {
  const {id: userId, authToken} = auth;
  const {sessionRequestIndicator, displayMessage} = dashboard;
  return {userId, authToken, sessionRequestIndicator, displayMessage}
};

const mapActionsToProps = () => {
  return {getDashboard, getUnreadMessagesCount}
};

export default connect(mapStateToProps, mapActionsToProps())(DashboardTutor);

