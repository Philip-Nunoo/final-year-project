import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Link = (props) => {
  const { text, onPress } = props;
  return (
    <TouchableOpacity style={styles.Link} onPress={onPress}>
      <Text style={[styles.LinkText, props.style]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

Link.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
};

Link.defaultProps = {
  text: 'Link Text',
  // eslint-disable-next-line no-console
  onPress: () => console.log('Link Pressed'),
};

export default Link;
