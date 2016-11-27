import { Meteor } from 'meteor/meteor';
import { SimpleSchema, check, Match } from 'meteor/aldeed:simple-schema';
import Users from '../../users/users.js';

Meteor.publish('users.profile', function (userId) {
  // Validate the arguments to be what we expect
  new SimpleSchema({
    userId: { type: String },
  }).validate({ userId });

  // Only return one field, `initials`
  const options = {
    fields: {
      name: 1,
      bio: 1,
    },
  };

  return Meteor.users.find({ _id: userId }, options);
});

Meteor.publish('users.public', function (params) {
  // Validate the arguments to be what we expect
  new SimpleSchema({
    username: { type: String },
  }).validate(params);

  const { username } = params;

  // Only return one field, `initials`
  const options = {
    fields: {
      username: 1,
      name: 1,
      'emails.address': 1,
    },
  };
  return Users.find({
    username,
  }, options);
});

Meteor.publish('users.account', function (userId) {
  // Validate the arguments to be what we expect
  new SimpleSchema({
    userId: { type: String },
  }).validate({ userId });

  // Only return one field, `initials`
  const options = {
    fields: {
      username: 1,
      socialLogin: 1,
    },
  };

  return Users.find({ _id: userId }, options);
});

Meteor.publish('users.own', function () {
  // Validate the arguments to be what we expect
  // Only return one field, `initials`
  const options = {
    fields: {
      username: 1,
      name: 1,
      connections: 1,
      'emails.address': 1,
    },
  };

  return Meteor.users.find({ _id: this.userId }, options);
});

Meteor.publish('users.connections', function () {
  // Validate the arguments to be what we expect
  // Only return one field, `initials`
  const options = {
    fields: {
      connections: 1,
    },
  };
  const options2 = {
    fields: {
      connections: 1,
      username: 1,
      name: 1,
    },
  };
  const user = Users.find({
    _id: this.userId,
  }, options).fetch();
  const connections = user[0].connections || [];
  const userIds = connections.map((connection) => {
    return connection.userId;
  });
  console.log('userIds', userIds);
  return Users.find({
    $and: [{ _id: { $ne: this.userId } }, { _id: { $in: userIds } }]
  }, options2);
});
