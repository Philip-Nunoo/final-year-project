import { Meteor } from 'meteor/meteor';
import Notes from '../index';

Meteor.publishComposite('notes.all', function () {
  return ({
    find() {
      return Notes.find({ createdBy: this.userId });
    },
    children: [
      {
        find(note) {
          return Meteor.users.find({ _id: note.createdBy });
        }
      }
    ]
  });
});
