/* eslint-disable react/prop-types */
import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {
  createAppContainer, createStackNavigator, createBottomTabNavigator,
} from 'react-navigation';

import Home from '../screens/Home';
import Details from '../screens/Details';
import Profile from '../screens/Profile';
import SignIn from '../screens/SignIn';
import { AddLog, EditLog, ViewLog, ViewMessages } from '../screens/Logs';

export const AuthStack = createAppContainer(createStackNavigator({
  SignIn: { screen: SignIn },
}, {
  headerMode: 'none',
}));

export const HomeStack = createStackNavigator({
  Home: { screen: Home },
  Details: {
    screen: Details,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
  AddLog: {
    screen: AddLog,
    navigationOptions: {
      headerTitle: 'Lodge Complaint'
    },
  },
  EditLog: {
    screen: EditLog,
    navigationOptions: {
      headerTitle: 'Edit Log'
    },
  },
  ViewLog: {
    screen: ViewLog,
    navigationOptions: {
      headerTitle: 'Issue Detail'
    }
  },
  ViewMessages: {
    screen: ViewMessages,
    navigationOptions: {
      headerTitle: 'Chat'
    },
  },
}, {
  initialRouteName: 'Home',
  headerMode: 'screen',
  defaultNavigationOptions: {
    headerTintColor: "#fff",
      // background gradiente
      headerBackground: (
        <LinearGradient
          colors={['#48c6ef', '#6f86d6']}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      ),
      headerTitleStyle: { color: '#fff', fontWeight: 'normal ' },
    // header: props => <GradientHeader {...props} />,
  }
});

export const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
  },
}, {
  headerMode: 'none',
});

export const Tabs = createAppContainer(createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <IonIcon
          name="ios-home"
          size={28}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Setting',
      tabBarIcon: ({ tintColor }) => (
        <IonIcon
          name="ios-settings"
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: '#6f86d6',
    inactiveTintColor: 'gray',
  },
}));
