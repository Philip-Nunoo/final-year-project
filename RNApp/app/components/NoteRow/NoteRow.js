import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  }
});

const NoteRow = ({ title, details }) => (
  <View style={styles.container}>
    <View>
      <Text>{title}</Text>
      <Text>{details}</Text>
    </View>
  </View>
);

NoteRow.propTypes = {
  details: PropTypes.string,
  title: PropTypes.string,
};

NoteRow.defaultProps = {
  details: null,
  title: null,
};

export default NoteRow;
