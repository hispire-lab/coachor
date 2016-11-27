import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Users from './users.js';

export const updateProfile = new ValidatedMethod({
  name: 'users.updateProfile',
  validate({ _id, modifier }) { // eslint-disable-line no-unused-vars
    new SimpleSchema({
      name: { type: String },
      bio: { type: String, optional: true },
    }).validate(modifier, { modifier: true });
  },
  run({ _id, modifier }) {
    return Users.update({ _id }, {
      $set: modifier.$set,
    });
  },
});

export const changeUsername = new ValidatedMethod({
  name: 'users.changeUsername',
  validate({ _id, modifier }) { // eslint-disable-line no-unused-vars
    new SimpleSchema({
      username: { type: String },
    }).validate(modifier, { modifier: true });
  },
  run({ _id, modifier }) {
    return Users.update({ _id }, {
      $set: modifier.$set,
    });
  },
});

export const searchUser = new ValidatedMethod({
  name: 'users.searchUser',
  validate({ search }) { // eslint-disable-line no-unused-vars
    new SimpleSchema({
      search: { type: String },
    }).validate(search);
  },
  run(search) {
    let query = {};
    const projection = {
      limit: 10,
      sort: { name: 1 },
      fields: {
        username: 1,
        name: 1,
        'emails.address': 1,
        connections: 1,
      },
    };
    const regex = new RegExp(search, 'i');
    query = {
      _id: { $ne: this.userId },
      $or: [
        { name: regex },
        { username: regex },
        { 'emails.address': regex },
      ],
    };

    projection.limit = 100;
    return Users.find(query, projection).fetch();
  },
});

export const connectUser = new ValidatedMethod({
  name: 'users.connect',
  validate({ userId }) { // eslint-disable-line no-unused-vars
    new SimpleSchema({
      userId: { type: String },
    }).validate({ userId });
  },

  run({ userId }) {
    const connection = {
      userId,
      aproved: false,
      invited: true,
    };
    // NOTE I'm not sure if it would be more convenient to create a
    // connection object on the recipient document at this point or
    // as it is currently creating that object once the recipient
    // accepts the invitation.

    return Users.update({
      _id: this.userId,
    }, {
      $push: { connections: connection },
    });
  },
});

export const disconnectUser = new ValidatedMethod({
  name: 'users.disconnectUser',
  validate({ userId }) { // eslint-disable-line no-unused-vars
    new SimpleSchema({
      userId: { type: String },
    }).validate({ userId });
  },

  run({ userId }) {
    // TODO delete connection element from connections array
    Users.update({
      _id: this.userId,
    }, {
      $pull: {
        connections: {
          userId,
        },
      },
    });

    Users.update({
      _id: userId,
    }, {
      $pull: {
        connections: {
          userId: this.userId,
        },
      },
    });
  },
});

export const acceptConnection = new ValidatedMethod({
  name: 'users.acceptConnection',
  validate({ userId }) { // eslint-disable-line no-unused-vars
    new SimpleSchema({
      userId: { type: String },
    }).validate({ userId });
  },

  run({ userId }) {
    Users.update({
      _id: userId,
      'connections.userId': this.userId,
    }, {
      $set: {
        'connections.$.aproved': true,
        'connections.$.invited': false,
      },
    });
    const connection = {
      userId,
      aproved: true,
      invited: false,
    };

    Users.update({
      _id: this.userId,
    }, {
      $push: { connections: connection },
    });
  },
});
