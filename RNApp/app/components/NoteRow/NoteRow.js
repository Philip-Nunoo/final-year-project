import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, Text, StyleSheet } from 'react-native';
// import Meteor from 'react-native-meteor';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    borderRadius: 5,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  details: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  footer: {
    borderTopColor: '#000',
    borderTopWidth: 1,
    marginTop: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 11,
  },
  createdAt: {
    fontSize: 11,
  },
});

// const getUserName = (userId) => {
//   const user = Meteor.collection('users').findOne(userId);
//   return user ? user.emails[0].address : '-';
// };

const NoteRow = ({ title, details, createdBy, createdAt }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.details}>{details}</Text>
    </View>
    <View style={styles.footer}>
      <View>
      </View>
      <Text style={[styles.footerText, styles.createdAt]}>
        {createdAt ?
        moment(createdAt).format('YYYY-MM-DD')
        : '-'}
      </Text>
    </View>
  </View>
);

NoteRow.propTypes = {
  details: PropTypes.string,
  title: PropTypes.string,
  createdAt: PropTypes.string,
  createdBy: PropTypes.string,
};

NoteRow.defaultProps = {
  details: null,
  title: null,
  createdAt: null,
  createdBy: null,
};

export default NoteRow;
