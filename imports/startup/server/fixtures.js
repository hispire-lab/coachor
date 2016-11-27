import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Users from '../../api/users/users.js';
import { Notifications } from '../../api/notifications/notifications.js';

Meteor.startup(() => {
  Users.remove({});
  Notifications.remove({});

  Accounts.createUser({
    username: 'Coachor',
    name: 'Jhon Doe',
    email: 'email@gmail.com',
    password: '11223344',
  });
  Accounts.createUser({
    username: 'Jamie',
    name: 'Jamie Caroccio',
    email: 'jamie@gmail.com',
    password: '11223344',
  });
});
