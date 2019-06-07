import React from 'react';
import { View, Text } from 'react-native';
import Meteor from 'react-native-meteor';
import moment from 'moment';
import Loading from '../../components/Loading';
import { viewLogStyles as styles } from './styles';

class ViewLog extends React.Component {
  state = {
    loading: true,
    log: null,
    error: null,
  };

  componentDidMount() {
    this.getNoteInfo(this.props);
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
