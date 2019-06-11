import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import noteSchema from './schema';
import email from '../../startup/server/email';

class NotesCollection extends Mongo.Collection {
  constructor() {
    super('notes');

    this.attachSchema(noteSchema);

    this.before.insert((userId, doc) => {
      if (doc.send) {
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

        doc.mail = {
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
      }
    });
  }
}

const Notes = new NotesCollection();

export default Notes;
