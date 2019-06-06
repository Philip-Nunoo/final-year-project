import { Meteor } from 'meteor/meteor';
import Notes from '../index';

Meteor.publishComposite('notes.all', function () {
    return ({
        find() {
            return Notes.find();
        }
    })
});
