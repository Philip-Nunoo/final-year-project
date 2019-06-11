import { Meteor } from 'meteor/meteor';
import email from '../../startup/server/email';

export const sendEmail = (
  userId,
  doc
) => {
  const user = Meteor.users.findOne(userId);
  const from = user.emails[0].address;
  const to = 'ketay99@gmail.com';
  const subject = doc.title;
  const text = doc.details;
  
  // start email trail
  const messageId = email.send({
    from: 'incident@social-care.com',
    to,
    subject,
    text
  });

  return {
    messageId,
    subject,
    messages: [
      {
        userId,
        from,
        to,
        message: doc.details,
        type: 'out'
      }
    ]
  };
};
