import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Users = Meteor.users;

Users.schema = new SimpleSchema({

  emails: {
    type: Array,
    // For accounts-password, either emails or username is required, but not
    // both. It is OK to make this optional here because the accounts-password
    // package does its own validation. Third-party login packages may not
    // require either. Adjust this schema as necessary for your usage.
    optional: true,
  },
  username: {
    type: String,
  },
  name: {
    type: String,
    optional: true,
  },
  'emails.$': {
    type: Object,
  },

  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  socialLogin: {
    type: Boolean,
    optional: true,
  },
  'emails.$.verified': {
    type: Boolean,
  },

  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },

  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true,
  },
  bio: {
    type: String,
    optional: true,
  },
  connections: {
    type: [Object],
    blackbox: true,
    optional: true,
  },
});

Users.attachSchema(Users.schema);
//Users._ensureIndex({ name: 1, username: 1, email: 1 });

Users.publicFields = {
  username: 1,
  name: 1,
};

export default Users;
