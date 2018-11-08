import React from 'react'
import { List, Image } from 'semantic-ui-react'
import './styles.css'
import moment from 'moment';

export default ({ user, chat, onClick }) => {
  return (
    <List.Item onClick={onClick} className='chat-row'>
      <Image bordered size='tiny' avatar src={user.pictureUrl ? user.pictureUrl : `http://via.placeholder.com/300?text=${user.name[0].toUpperCase()}`} />
      <List.Content>
        <List.Header style={{ fontSize: 20, marginLeft: 16 }}>
          {user.name}
        </List.Header>
        <List.Description style={{ marginTop: 12, marginLeft: 16 }}>
          {chat.lastMessage.includes('https://firebasestorage.googleapis.com/') ? 'Sent an image' : chat.lastMessage} • {moment(chat.updatedAt).fromNow()}
        </List.Description>
      </List.Content>
    </List.Item>
  )
}