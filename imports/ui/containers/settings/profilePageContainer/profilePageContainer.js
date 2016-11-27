import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Schemas from '../../../lib/schemas.js';
import Users from '../../../../api/users/users.js';
import './profilePageContainer.html';
import '../../../pages/settings/profile';

Template.profilePageContainer.onCreated(function profilePageContainer() {
  this.autorun(() => {
    new SimpleSchema({}).validate(Template.currentData || {});
    this.subscribe('users.profile', Meteor.userId());
  });
});

Template.profilePageContainer.helpers({
  Schemas() {
    return Schemas;
  },
  profileData() {
    return Users.findOne();
  },
  profileReady() {
    const instance = Template.instance();
    return instance.subscriptionsReady();
  },
});
