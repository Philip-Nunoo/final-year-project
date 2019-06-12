import React from 'react';
import { View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Meteor, { createContainer } from 'react-native-meteor';
import { viewMessageStyles as styles } from './styles';

class ViewMessages extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hi',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages.length !== this.props.messages.length) {
      this.setMessages(nextProps);
    }
  }

  setMessages = (props) => {
    // this.setState({
    //   messages: props.messages
    // });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

const container = createContainer(({}) => {
  // const handle = Meteor.subscribe('note.detail', noteId);
  // const note = handle.ready() ? 
  //   Meteor.collection('notes').findOne(noteId) :
  //   {};
  // const mails = note.mail ? note.mail.messages.map((message) => ({
  //   ...message
  // })) : []; 
  return {
    // loading: !handle.ready(),
    // note,
    // messages: mails
  };
}, ViewMessages);

export default container;
