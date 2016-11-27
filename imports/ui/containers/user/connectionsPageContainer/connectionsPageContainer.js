import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import Users from '../../../../api/users/users.js';
import './connectionsPageContainer.html';
import '../../../pages/connectionsPage';

Template.connectionsPageContainer.onCreated(function connectionsPageContainer() {
  this.autorun(() => {
    this.subscribe('users.connections');
  });
});

Template.connectionsPageContainer.helpers({
  userConnections() {
    console.log(Users.find().fetch());
    const users = Users.find().fetch().filter((user) => {
      return user._id !== Meteor.userId();
    });
    console.log(users);
    return users;
  },
  userConnectionsReady() {
    const instance = Template.instance();
    return instance.subscriptionsReady();
  },
});
