import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/philip100:email';

const email = new Email();
const {
  username,
  password,
  server,
  port,
} = Meteor.settings.private.smtp;

const smtpUrl = Email.getSMTPUrl({
    username,
    password,
    server,
    port,
});

// if(Meteor.isProduction) {
  process.env.MAIL_URL = Meteor.settings.private.smtpUrl;
// }

console.log('Meteor.settings.private.smtpUrl;', Meteor.settings.private.smtpUrl);

export default email;
