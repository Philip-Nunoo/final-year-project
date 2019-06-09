import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
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
    doc: { issueReport: false, },
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
      this.setState({ doc, id });
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
    const { id, doc } = this.state;

    if (this.validInput()) {
      Meteor.call('note.edit', id, doc, err => {
        if (err) {
          this.handleError(err.reason);
        } else {
          navigation.goBack();
        }
      })
    }
  }

  render() {
    const { doc, id, error } = this.state;

    return (
      <View style={styles.container}>
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
          />
        </InputWrapper>
        <View style={{ marginTop: 10 }}>
          <ToggleSwitch
            isOn={doc.issueReport}
            label='Send issue to agent'
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
        <View style={styles.button}>
          <Button
            text="Edit Log"
            onPress={this.editLog}
          />
        </View>
        <KeyboardSpacer />
      </View>
    );
  }
}

export default EditLog;
