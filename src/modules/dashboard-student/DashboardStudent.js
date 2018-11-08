import React from 'react';
import {NotificationsSection, StatsSection, SuggestedTutors} from './sections';
import {connect} from 'react-redux';
import { Icon } from 'semantic-ui-react'

import {Notification} from 'react-notification';
import {getDashboard, getUnreadMessagesCount,toggleSearchMode} from '../../redux/actions';
import {SearchResults} from '../search'

class DashboardStudent extends React.Component {

  state = {
    isNotificationActive: false,
    unreadMessageCount: 0
  };

  componentDidMount() {
    const {userId, authToken} = this.props;
    this.props.getDashboard({userId, authToken});
    this.props.getUnreadMessagesCount();
    this.props.toggleSearchMode('normal')
    
  }

  componentWillUnmount(){
    this.props.toggleSearchMode('normal')    
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

  onCancelSearch = () => {
    this.props.toggleSearchMode('normal')
  };


  render() {
    const {unreadMessagesCount} = this.state;
    return (
      <div>
      { 
        this.props.searchMode === 'normal'?
        <div>
            <StatsSection unreadMessagesCount={unreadMessagesCount}/>
            <NotificationsSection/>
            <SuggestedTutors/>
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
        :
        <div style={{  }} >
          <Icon name='delete' size='large' color='red' style={{ cursor:'pointer',position:'relative',left:'80%' }} 
                        onClick={this.onCancelSearch} />
          <SearchResults/>
        </div>
      }
      </div>
    );
  }
}

const mapStateToProps = ({auth, dashboard,search}) => {
  const {id: userId, authToken} = auth;
  const {sessionRequestIndicator, displayMessage, unreadMessageCount} = dashboard;
  const {searchMode} = search;
  return {userId, authToken, sessionRequestIndicator, displayMessage, unreadMessageCount,searchMode}
};

const mapActionToProps = () => {
  return {getDashboard, getUnreadMessagesCount,toggleSearchMode}
};


export default connect(mapStateToProps, mapActionToProps())(DashboardStudent);

