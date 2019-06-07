import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Meteor from 'react-native-meteor';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 5,
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
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 11,
  },
  footerLeft: {
    flexDirection: 'row',
  },
  messageText: {
    marginRight: 5,
  },
  createdAt: {
    fontSize: 11,
  },
});

// const getUserName = (userId) => {
//   const user = Meteor.collection('users').findOne(userId);
//   return user ? user.emails[0].address : '-';
// };

const NoteRow = ({ title, details, mail, createdAt }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.details}>{details}</Text>
    </View>
    <View style={styles.footer}>
      <View>
        <Icon
          name="snapchat-ghost"
          style={{ color: '#220A82' }}
        />
      </View>
      <View style={styles.footerLeft}>
        {mail &&
        <Text style={[styles.footerText, styles.messageText]}>
          {mail.messages.length}
          {' '}
          <MaterialCommunityIcon
            name="chat"
            style={{ marginRight: 10, color: '#000' }}
          />
        </Text>}
        <Text style={[styles.footerText, styles.createdAt]}>
          {createdAt ?
          moment(createdAt).format('LL')
          : '-'}
        </Text>
      </View>
    </View>
  </View>
);

NoteRow.propTypes = {
  details: PropTypes.string,
  title: PropTypes.string,
  createdAt: PropTypes.string,
  createdBy: PropTypes.string,
  mail: PropTypes.shape({
    messageId: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf({
      userId: PropTypes.string,
    }),
  }),
};

NoteRow.defaultProps = {
  details: null,
  title: null,
  createdAt: null,
  createdBy: null,
  mail: null,
};

export default NoteRow;
