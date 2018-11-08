import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, List} from 'semantic-ui-react';
import {ChatRow} from './chat-strip';
import {ChatActions} from '../../redux/actions';
import {history} from '../../redux/store';
import "./styles.css";

class Chat extends Component {

  state = {chats: []};

  constructor(props) {
    super(props);
    this.createChatsFromResponse = this.createChatsFromResponse.bind(this);
  }

  componentDidMount() {
    const {loadChats} = this.props;
    loadChats();
  }

  componentWillReceiveProps(nextProps) {
    const {chats, error} = nextProps;
    if (error !== undefined && error !== null && error !== this.props.error) {
      //message.error(error);
    }

    this.createChatsFromResponse(chats);
  };

  componentWillUnmount() {
    this.props.unsubscribe();
  }

  createChatsFromResponse = (chats) => {
    let chatRows = chats.map(chat => {
    
      return <ChatRow
        onClick={() => {
          this.onChatSelected(chat)
        }}
        key={chat.key}
        chat={{updatedAt: chat.updatedAt, lastMessage: chat.lastMessage}}
        user={{name: chat.user.name, pictureUrl: chat.user.profilePictureUrl}}/>
    }); 
    this.setState({chats: chatRows});
  };

  onChatSelected = (chat) => {
    const otherUserRole = this.props.currentUser.role === 'student' ? 'tutor' : 'student';
    this.props.showMessages(this.props.currentUser, {...chat.user, role: otherUserRole}, chat.key);
    history.push(`/messages`);
  };

  render = () => {
    const {chats, isLoadingChats} = this.state;
    return (
      <Grid className='chatsContainer'>
        <Grid.Row centered className='chatsHeader'>
          <Grid.Column width={12}>
            <span>Messages</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column textAlign='left' width={12} style={{height: '65vh', overflow: 'scroll'}}>
            <List relaxed='very' selection verticalAlign='middle'>{chats}</List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = ({auth, chatReducer}) => {
  const {chats, error, isLoadingChats} = chatReducer;
  const {id, role, firstName, lastName} = auth;
  return {currentUser: {id, role, firstName, lastName}, chats, error, isLoadingChats};
};

const mapActionsToProps = () => {
  return {
    loadChats: ChatActions.loadChats,
    showError: ChatActions.showError,
    showMessages: ChatActions.showMessages,
    unsubscribe: ChatActions.unsubscribe
  }
};

export default connect(mapStateToProps, mapActionsToProps())(Chat);