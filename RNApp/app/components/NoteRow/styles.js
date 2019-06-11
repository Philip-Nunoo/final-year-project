import { StyleSheet } from 'react-native';

const noteRowStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 5,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    borderRadius: 5,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 12,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // borderRadius: 10,
  },
  horizontal: {
    flexDirection: 'row',
    marginRight: 8,
  },
  hiconlogo: {
    marginLeft: 10,
  },
  title: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'normal',
  },
  detailContainer: {
    padding: 10,
  },
  details: {
    fontSize: 13,
    color: '#8a8a8a'
  },
  footer: {
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 10,
    fontStyle: 'italic'
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
