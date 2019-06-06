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
});
