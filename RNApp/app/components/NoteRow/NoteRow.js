import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Meteor from 'react-native-meteor';
import styles from './styles';

// const getUserName = (userId) => {
//   const user = Meteor.collection('users').findOne(userId);
//   return user ? user.emails[0].address : '-';
// };

const NoteRow = ({ _id, title, details, mail, createdAt, navigation }) => (
  <TouchableNativeFeedback
    onPress={() => navigation.navigate('ViewLog', { id: _id })}
  >
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>{details}</Text>
      </View>
      <View style={styles.footer}>
        <View>
          <Icon name="snapchat-ghost" style={{ color: '#220A82' }} />
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
  </TouchableNativeFeedback>
);

NoteRow.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  details: PropTypes.string,
  title: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  createdBy: PropTypes.string,
  mail: PropTypes.shape({
    messageId: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
      })
    ),
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
