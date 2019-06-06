import { Mongo } from 'meteor/mongo';
import noteSchema from './schema';

class NotesCollection extends Mongo.Collection {
    constructor() {
        super('notes');

        this.attachSchema(noteSchema);
    }
}

const Notes = new NotesCollection();

export default Notes;
