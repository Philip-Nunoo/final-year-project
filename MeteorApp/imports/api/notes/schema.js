import SimpleSchema from 'simpl-schema';

export const noteFormSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
    max: 200,
  },
  details: {
    type: String,
    max: 2000
  },
});

const noteSchema = new SimpleSchema({
  createdBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
});

export default noteSchema.extend(noteFormSchema);
