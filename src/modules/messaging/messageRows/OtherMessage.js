import React, {Component} from 'react';
import {List, Image} from 'semantic-ui-react';
import moment from 'moment';

class OtherMessage extends Component {

  constructor(props) {
    super(props);
    this.renderImageMessage = this.renderImageMessage.bind(this);
    this.renderTextMessage = this.renderTextMessage.bind(this);
  }

  renderImageMessage = (message) => {
    return (
      <div>
        <Image src={message.text} size={'medium'} as={'a'} target={'_blank'} href={message.text}/>
        <p style={{fontSize: 10, textAlign: 'right', color: '#AAA', marginTop: 8}}>
          {moment(message.createdAt).fromNow()}
        </p>
      </div>
    )
  };

  renderTextMessage = (message) => {
    return (
      <div>
        <p style={{fontSize: 13}}>{message.text}</p>
        <p style={{fontSize: 10, textAlign: 'left', color: '#AAA'}}>
          {moment(message.createdAt).fromNow()}
        </p>
      </div>
    )
  };

  render() {
    const {message} = this.props;
    const cornerRadius = 8;
    const wrapperStyle = {
      padding: 16,
      backgroundColor: '#F5F5F5',
      borderTopLeftRadius: cornerRadius,
      borderTopRightRadius: cornerRadius,
      borderBottomRightRadius: cornerRadius,
      float: 'left',
      maxWidth: '40%'
    };

    return (
      <List.Item>
        <div>
          <div style={wrapperStyle}>
            {message.type === 'FILE' ? this.renderImageMessage(message) : this.renderTextMessage(message) }
          </div>
        </div>
      </List.Item>
    )
  }
}

export default OtherMessage;