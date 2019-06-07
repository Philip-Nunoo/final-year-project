import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { noteFormSchema } from '../schema';
import Notes from '..';

export const addNote = new ValidatedMethod({
  name: 'note.add',
  validate: noteFormSchema.validator(),
  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error('un-authorized', 'Unauthorized');
    }
    const noteId = Notes.insert({
      ...doc,
      createdBy: this.userId
    });
    return noteId;
  },
});

export const getNote = new ValidatedMethod({
  name: 'note.get',
  validate: null,
  run(noteId) {
    if (!this.userId) {
      throw new Meteor.Error('un-authorized', 'Unauthorized');
    }
    const note = Notes.findOne(noteId);
    if (!note) {
      throw new Meteor.Error('note-not-found', 'What you are looking for has been removed');
    }
    return note;
  }
});

export const removeNote = new ValidatedMethod({
  name: 'note.remove',
  validate: null,
  run(noteId) {
    if (!this.userId) {
      throw new Meteor.Error('un-authorized', 'Unauthorized');
    }
    const note = Notes.remove(noteId);
    if (!note) {
      throw new Meteor.Error('note-not-found', 'What you are looking for has been removed');
    }
    return note;
  }
});
