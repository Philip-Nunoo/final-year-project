import React from 'react';
import { View, Text, Alert } from 'react-native';
import Meteor from 'react-native-meteor';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import { withNavigation } from "react-navigation";
import Loading from '../../components/Loading';
import { viewLogStyles as styles } from './styles';
import Link from '../../components/Link';

class ViewLog extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return ({
      headerTitle: 'Home',
      // headerRight: (
      //   <Icon
      //     name="delete"
      //     size={28}
      //     style={{ marginRight: 10, color: '#000' }}
      //     onPress={navigation.getParam('deleteLog')}
      //   />
      // ),
    });
  }
  state = {
    loading: true,
    log: null,
    error: null,
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.getNoteInfo(this.props);
      this.props.navigation.setParams({ deleteLog: this._deleteLog });
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  _deleteLog = () => {
    const logId = this.props.navigation.getParam('id');

    Alert.alert(
      'Remove Issue',
      'This would permanently delete all log as well as correspondence',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.deleteLog(logId),
        },
      ],
      { cancelable: false },
    );
  }

  deleteLog = (logId) => {
    Meteor.call('note.remove', logId, (err) => {
      if (err){
        return;
      }
      Alert.alert(
        'Item Removed',
        'You removed this event from your list',
        [
          {
            text: 'OK',
            onPress: () => this.props.navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
    })
  }

  getNoteInfo = (props) => {
    const logId = props.navigation.getParam('id');
    
    Meteor.call('note.get', logId, (err, log) => {
      const newState = { loading: false };
      if (err) {
        newState.error = err.reason;
      } else {
        newState.error = null;
        newState.log = log;
      }
      this.setState(newState);
    });
  }

  render() {
    const { log, loading, error } = this.state;
    const { navigation } = this.props;

    if (loading) {
      return <Loading />;
    };
    const logId = navigation.getParam('id');

    return (
      <View style={styles.container}>
        {error && <Text>{error}</Text>}
        {
          log ?
          <React.Fragment>
            {!log.send &&
            <View style={styles.mail}>
              <Text style={styles.mailText}>
                Go to edit page to send this report
              </Text>
            </View>
            }
            <View style={styles.body}>
              <Text style={styles.title}>
                {log.title}
              </Text>
              <Text style={styles.details}>
                {log.details}
              </Text>
            </View>
            <View style={styles.body}>
              <Text>{moment(log.createdAt).format("LLLL")}</Text>
            </View>
            <ActionButton buttonColor="#1abc9c">
              <ActionButton.Item
                buttonColor='#9b59b6'
                title="Edit"
                onPress={() => navigation.navigate('EditLog', { id: logId, log })}
              >
                <Ionicon name="md-create" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              {log.mail || log.send &&
              <ActionButton.Item
                buttonColor='#3498db'
                title="Message"
                onPress={() => navigation.navigate('ViewMessages', { id: logId })}
              >
                <Ionicon name="md-chatboxes" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              }
              <ActionButton.Item
                buttonColor='rgba(231,76,60,1)'
                title="Remove"
                onPress={this._deleteLog}
              >
                <Icon name="delete" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
          </React.Fragment>
          : <Text>No log found</Text>
        }
      </View>
    );
  }

}

export default withNavigation(ViewLog);
