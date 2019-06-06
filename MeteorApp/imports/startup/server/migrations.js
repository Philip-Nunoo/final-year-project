import { Migrations } from 'meteor/percolate:migrations';
import Notes from '../../api/notes';

Migrations.config({
  // Log job run details to console
  log: true,

  // Use a custom logger function (defaults to Meteor's logging package)
  logger: null,

  // Enable/disable logging "Not migrating, already at version {number}"
  logIfLatest: false,

  // migrations collection name to use in the database
  collectionName: "migrations"
});

Meteor.startup(() => {
  Migrations.migrateTo('latest');
});

Migrations.add({
  version: 1,
  name: 'Add issueReport default value',
  up: function() {
    Notes.find(
      { issueReport: { $eq: null } },
      { fields: { _id: 1 }}).fetch(({ _id }) => {
        Notes.update(_id, { $set: { issueReport: false } });
    });
  },
});
