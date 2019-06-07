import React from 'react';
import { View, Text, Alert } from 'react-native';
import Meteor from 'react-native-meteor';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../../components/Loading';
import { viewLogStyles as styles } from './styles';

class ViewLog extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return ({
      headerTitle: 'Home',
      headerRight: (
        <Icon
          name="delete"
          size={28}
          style={{ marginRight: 10, color: '#000' }}
          onPress={navigation.getParam('deleteLog')}
        />
      ),
    });
  }
  state = {
    loading: true,
    log: null,
    error: null,
  };

  componentDidMount() {
    this.getNoteInfo(this.props);
    this.props.navigation.setParams({ deleteLog: this._deleteLog });
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

    if (loading) {
      return <Loading />;
    };

    return (
      <View style={styles.container}>
        {error &&
        <Text>{error}
        </Text>}
        {
          log ?
          <React.Fragment>
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
          </React.Fragment>
          : <Text>No log found</Text>
        }
      </View>
    );
  }

}

export default ViewLog;
