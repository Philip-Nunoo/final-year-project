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

class AddLog extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    doc: {
      issueReport: false,
      anonymous: false,
    },
    error: null,
  };

  componentWillMount() {
    this.mounted = true;
  }
  
  componentWillUnmount() {
    this.mounted = false;
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

  addLog = () => {
    const { navigation } = this.props;
    const { doc } = this.state;

    if (this.validInput()) {
      Meteor.call('note.add', doc, err => {
        if (err) {
          this.handleError(err.reason);
        } else {
          navigation.goBack();
        }
      })
    }
  }

  saveAndSend = () => {
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
                this.addLog();
              });
            },
          },
        ],
        { cancelable: false },
      );
    }
  }

  render() {
    const { doc, error } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Make Complaint</Text>
        <InputWrapper>
          <GenericTextInput
            placeholder="Title"
            autoCapitalize='sentences'
            onChangeText={title => this.setState({ doc: {
              ...doc,
              title
            }})}
          />
        </InputWrapper>
        <InputWrapper>
          <GenericTextInput
            placeholder="Details"
            multiline
            numberOfLines={15}
            autoCapitalize='sentences'
            onChangeText={details => this.setState({ doc: {
              ...doc,
              details
            }})}
          />
        </InputWrapper>
        <View style={{ marginTop: 10 }}>
          <ToggleSwitch
            isOn={doc.anonymous}
            label='Make anonymous'
            labelStyle={{}}
            onToggle={anonymous => this.setState({ doc: {
              ...doc,
              anonymous
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
            text="Save"
            onPress={this.addLog}
            style={styles.button}
          />
          <Button
            text="Save &amp; Send"
            onPress={this.saveAndSend}
            style={styles.button}
          />
        </View>
        <KeyboardSpacer />
      </View>
    );
  }
}

export default AddLog;
