import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Schemas from '../../../lib/schemas.js';
import Users from '../../../../api/users/users.js';
import './accountPageContainer.html';
import '../../../pages/settings/account';

Template.accountPageContainer.onCreated(function accountPageContainer() {
  this.autorun(() => {
    new SimpleSchema({}).validate(Template.currentData || {});
    this.subscribe('users.account', Meteor.userId());
  });
});

Template.accountPageContainer.helpers({
  accountData() {
    console.log(Users.findOne());
    return Users.findOne();
  },
  accountReady() {
    const instance = Template.instance();
    return instance.subscriptionsReady();
  },
  Schemas() {
    return Schemas;
  },
});
