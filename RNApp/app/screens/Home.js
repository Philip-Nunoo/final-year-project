import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import createContainer from 'react-native-meteor/src/components/createContainer';
import Meteor from 'react-native-meteor';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../components/Button';
import { colors } from '../config/styles';
import Loading from '../components/Loading';
import NoteRow from '../components/NoteRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
    color: colors.headerText,
    fontWeight: '400',
    fontStyle: 'italic',
  },
});

const Home = ({ navigation, loading, notes }) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {notes.length > 0 ?
      <ScrollView>
        {notes.map((note) => (
          <NoteRow key={note._id} {...note} />
        ))}
      </ScrollView>
      :
        <View>
          <Text style={styles.text}>
            You have No Logs
          </Text>
          <Text style={styles.text}>
            Feel free to create one anytime
          </Text>
          <Button
            text='Make Complaint'
            onPress={() => navigation.navigate('AddLog')}
          />
        </View>
      }
    </View>
  );
}

Home.navigationOptions = {
  headerRight: <Button text="Add" />
};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool,
  notes: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

Home.defaultProps = {
  loading: true,
  notes: [],
};

const container = createContainer(() => {
  const handle = Meteor.subscribe('notes.all');

  return {
    loading: !handle.ready(),
    notes: Meteor.collection('notes').find() || [],
  };
}, Home);

container.navigationOptions = ({ navigation }) => {
  return ({
    headerTitle: 'Home',
    headerRight: (
      <Button
        text="Add"
        onPress={() => navigation.navigate('AddLog')}
      />
    ),
  });
}

export default container;
