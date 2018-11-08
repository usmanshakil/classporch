import React from 'react';
import {history} from '../../../../redux/store';
import {Grid, Image} from 'semantic-ui-react';
import './styles.css';
import {messageIcon, messageIconUnread} from '../../../../assets/dashboard';
import {connect} from 'react-redux';

class StatsSection extends React.Component {

  constructor(props) {
    super(props);
    this.onChatsViewed = this.onChatsViewed.bind(this);
  }

  onChatsViewed = () => {
    history.push('/chats');
  };

  render() {
    const {profile, unreadMessageCount} = this.props.dashboard;

    return (
      <Grid className='tutor-stats-section'>
        <Grid.Row centered>
          <Grid.Column width={12} textAlign='left'>
            <p className='tutor-greeting'> Hi {profile['full-name'].split(' ')[0]} </p>
            <span className='tutor-greeting2'>Here is your tailored dashboard.</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row/>
        <Grid.Row centered style={{cursor: 'pointer'}} onClick={this.onChatsViewed}>
          <Grid.Column width={12} textAlign='left'>
            <Image src={unreadMessageCount ? messageIconUnread : messageIcon} size='mini' verticalAlign='middle'/>
            <span className='dashboard-message-text'> {unreadMessageCount ? unreadMessageCount : 0} new messages</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row centered>
          <Grid.Column width={3}>
            <a className='dashboard-stats-container'>
              <p className='dashboard-stats-text'>
                {profile['sessions-done-count']} <br/>
                Sessions done <br/>
                Today
              </p>
            </a>
          </Grid.Column>
          <Grid.Column width={3}>
            <a className='dashboard-stats-container'>
              <p className='dashboard-stats-text'>
                {profile['scheduled-sessions-count']} <br/>
                Scheduled <br/>
                Sessions
              </p>
            </a>
          </Grid.Column>
          <Grid.Column width={3}>
            <a className='dashboard-stats-container'>
              <p className='dashboard-stats-text'>
                {profile['unread-messages-count']} <br/>
                Requested <br/>
                Sessions
              </p>
            </a>
          </Grid.Column>
          <Grid.Column width={3}/>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = ({dashboard}) => {
  return {dashboard}
};


export default connect(mapStateToProps, {})(StatsSection);

