import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import './nav.html';
import '../../components/notification/notification';

Template.nav.onRendered(() => {;
  $(".dropdown-button").dropdown();
  $(".button-collapse").sideNav();
});

Template.nav.helpers({
  notifications() {
    return Template.instance().data;
  },
  notificationsCount() {
    return Template.instance().data.length;
  },
});

Template.nav.events({
  'click .js-logout'(event) {
    event.preventDefault();
    if (Meteor.userId()) {
      AccountsTemplates.logout();
    } else {
      AccountsTemplates.linkClick('signIn');
    }
  },
});
