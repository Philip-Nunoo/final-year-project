import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export const addLogStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerText: {
    fontSize: 18,
    margin: 12,
  },
  error: {
    height: 28,
    marginLeft: 10,
    justifyContent: 'flex-start',
    width: window.width,
    alignItems: 'flex-start',
  },
  errorText: {
    color: colors.errorText,
    fontSize: 14,
  },
  mail: {
    padding: 10,
    backgroundColor: '#0E8A9B',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mailText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  buttonGroup:{
    // justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
});

export const viewLogStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    padding: 10,
    margin: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    color: '#000',
    marginBottom: 10,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
  },
  details: {
    fontSize: 13,
    textAlign: 'justify',
    lineHeight: 20,
    padding: 5,
  },
  mail: {
    padding: 10,
    backgroundColor: '#0E8A9B',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mailText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  linkText: {
    fontWeight: '700',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export const viewMessageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
