import Config from 'react-native-config';

export const settings = {
  env: process.env.NODE_ENV,
  METEOR_URL: Config.METEOR_URL,
};

export default settings;
