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

Meteor.publishComposite('note.detail', function (id) {
  return ({
    find() {
      return Notes.find({ _id: id, createdBy: this.userId });
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
