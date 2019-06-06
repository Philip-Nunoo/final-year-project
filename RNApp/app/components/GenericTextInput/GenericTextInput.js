import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import styles from './styles';

const GenericTextInput = (props) => {
  const { borderTop } = props;
  return (
    <View>
      {borderTop ? <View style={styles.divider} /> : null}
      <TextInput
        style={props.multiline ? styles.multilineInput : styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
    </View>
  );
};

GenericTextInput.propTypes = {
  borderTop: PropTypes.bool,
};

GenericTextInput.defaultProps = {
  borderTop: false,
  multiline: false,
};

export default GenericTextInput;
