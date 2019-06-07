import { StyleSheet } from 'react-native';

const noteRowStyles = StyleSheet.create({
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

export default noteRowStyles;
