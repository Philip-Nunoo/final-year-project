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
