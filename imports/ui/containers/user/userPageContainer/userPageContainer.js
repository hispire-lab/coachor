import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Users from '../../../../api/users/users.js';
import './userPageContainer.html';
import '../../../pages/userPage';

Template.userPageContainer.onCreated(function userPageContainer() {
  this.getUsername = () => FlowRouter.getParam('username');
  this.autorun(() => {
    this.subscribe('users.public', { username: this.getUsername() });
  });
});

Template.userPageContainer.helpers({
  userData() {
    return Users.findOne({username: Template.instance().getUsername()});
  },
  currentUserData() {
    return Template.instance().data;
  },
  userDataReady() {
    const instance = Template.instance();
    return instance.subscriptionsReady();
  },
});
