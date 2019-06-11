import { Mongo } from 'meteor/mongo';
import noteSchema from './schema';
import { sendEmail } from './lib';

class NotesCollection extends Mongo.Collection {
  constructor() {
    super('notes');

    this.attachSchema(noteSchema);

    this.before.insert((userId, doc) => {
      if (doc.send) {
        const newDoc = sendEmail(userId, doc);
      }
    });

    this.before.update(function (userId, doc) {
      if (doc.send === true) {
        const newDoc = sendEmail(userId, doc);
      }
    })
  }
}

const Notes = new NotesCollection();

export default Notes;
