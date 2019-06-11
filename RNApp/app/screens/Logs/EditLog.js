import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Alert } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Meteor from 'react-native-meteor';
import ToggleSwitch from 'toggle-switch-react-native';
import { addLogStyles as styles } from './styles';
import GenericTextInput, { InputWrapper } from '../../components/GenericTextInput';
import Button from '../../components/Button';

const MAX_COUNT = 0;

class EditLog extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    doc: { issueReport: false, send: false, anonymous: false },
    error: null,
  };

  componentDidMount() {
    this.setDefaultState(this.props);
  }

  componentWillMount() {
    this.mounted = true;
  }
  
  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(nextProps) {
    this.setDefaultState(nextProps);
  }

  setDefaultState = ({ navigation }) => {
    const id = navigation.getParam('id');
    const doc = navigation.getParam('log');
    if (doc) {
      this.setState({
        id,
        doc: {
          title: doc.title,
          details: doc.details,
          issueReport: doc.issueReport,
          send: doc.send,
          anonymous: doc.anonymous
        },
      });
    }
  }

  handleError = (error) => {
    if (this.mounted) {
      this.setState({ error });
    }
  }

  validInput = () => {
    const { doc } = this.state;

    let valid = true;
    
    if (!doc.details) {
      this.handleError('Please enter event detail');
      valid = false;
    }
    
    if (doc.details && (doc.details.length <= MAX_COUNT)) {
      this.handleError('Please enter a very descriptive detail');
      valid = false;
    }

    if (!doc.title) {
      this.handleError('Please specify title');
      valid = false;
    }

    if (valid) {
      this.handleError(null);
    }

    return valid;
  }

  editLog = () => {
    const { navigation } = this.props;
    const { id, doc: note } = this.state;

    if (this.validInput()) {
      Meteor.call('note.edit', { id, note }, err => {
        if (err) {
          this.handleError(err.reason);
        } else {
          navigation.goBack();
        }
      })
    }
  }

  updateAndSend = () => {
    if (this.validInput()) {
      Alert.alert(
        'Send Report',
        'This would send an email to our standby coordinators to assist you. Do you want to continue?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              const { doc } = this.state;

              this.setState({ doc: { ...doc, send: true } }, () => {
                this.editLog();
              });
            },
          },
        ],
        { cancelable: false },
      );
    }
  }

  render() {
    const { doc, id, error } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.mail}>
          <Text style={styles.mailText}>
            Message already sent
          </Text>
        </View>
        <Text style={styles.headerText}>Editting log</Text>
        <InputWrapper>
          <GenericTextInput
            placeholder="Title"
            autoCapitalize='sentences'
            value={doc.title}
            onChangeText={title => this.setState({ doc: {
              ...doc,
              title
            }})}
            editable={!doc.send}
          />
        </InputWrapper>
        <InputWrapper>
          <GenericTextInput
            placeholder="Details"
            multiline
            numberOfLines={15}
            autoCapitalize='sentences'
            value={doc.details}
            onChangeText={details => this.setState({ doc: {
              ...doc,
              details
            }})}
            editable={!doc.send}
          />
        </InputWrapper>
        <View style={{ marginTop: 10 }}>
          <ToggleSwitch
            isOn={doc.anonymous}
            label='Make anonymous'
            onToggle={issueReport => this.setState({ doc: {
              ...doc,
              issueReport
            }})}
          />
        </View>

        {doc.details &&
        <View style={styles.textCount}>
          <Text style={styles.textCount}>
            {doc.details.length < MAX_COUNT ?
            `${MAX_COUNT - doc.details.length} more to go.`
            :
              null
            }
          </Text>
        </View>
        }
        <View style={styles.error}>
          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
        <View style={styles.buttonGroup}>
          <Button
            text="Update"
            onPress={this.editLog}
            style={styles.button}
          />
          {!doc.send &&
          <Button
            text="Update &amp; Send"
            onPress={this.updateAndSend}
            style={styles.button}
          />
          }
        </View>
        <KeyboardSpacer />
      </View>
    );
  }
}

export default EditLog;
