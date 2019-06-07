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
  issueReport: {
    type: Boolean,
    defaultValue: false,
  },
});

export const mailSchema = new SimpleSchema({
  messageId: { type: String },
  subject: { type: String },
  messages: { type: Array },
  'messages.$': { type: Object },
  'messages.$.userId': {
    type: String,
    regEx: SimpleSchema.RegEx.IP,
  },
  message: { type: String },
  type: {
    type: String,
    allowedValues: ['out', 'in'],
  },
});

const noteSchema = new SimpleSchema({
  mail: {
    type: mailSchema,
    optional: true,
  },
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

noteSchema.extend(noteFormSchema);
export default noteSchema;
