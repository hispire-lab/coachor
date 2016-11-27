import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import Users from '../../../api/users/users.js';
import { Notifications } from '../../../api/notifications/notifications.js';
import './appLayout.html';

Template.appLayout.onCreated(function userPageContainer() {
  this.autorun(() => {
    this.subscribe('users.own', Meteor.userId());
    this.subscribe('notifications.user', Meteor.userId());
  });
});

Template.appLayout.helpers({
  loggedUserData() {
    return Users.findOne();
  },
  loggedUserDataReady() {
    const instance = Template.instance();
    return instance.subscriptionsReady();
  },
  notifications() {
    console.log(Notifications.find({}).fetch());
    return Notifications.find({}).fetch();
  },
  notificationsReady() {
    const instance = Template.instance();
    return instance.subscriptionsReady();
  },
});
