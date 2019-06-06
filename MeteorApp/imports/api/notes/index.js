import { Mongo } from 'meteor/mongo';

class NotesCollection extends Mongo.Collection {
    constructor() {
        super('notes');
    }
}

const Notes = new NotesCollection();

export default Notes;
