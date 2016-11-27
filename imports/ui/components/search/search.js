import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ReactiveVar } from 'meteor/reactive-var';
import Users from '../../../api/users/users.js';
import { searchUser, connectUser } from '../../../api/users/methods.js';
import './search.html';
import '../../components/loading/loading';

Template.search.onCreated(() => {
  const template = Template.instance();

  template.searchResults = new ReactiveVar([]);
  template.searching = new ReactiveVar(false);

  /* template.autorun(() => {
    template.subscribe('users.connections');
  });*/
});

Template.search.helpers({
  searching() {
    return Template.instance().searching.get();
  },
  /* usersReady() {
    const instance = Template.instance();
    return instance.subscriptionsReady();
  },*/
  connections() {
    console.log(Users.findOne());
    return Users.findOne();
  },
  searchResults() {
    return Template.instance().searchResults.get();
  },
});

Template.search.events({
  'keyup [name="search"]' (event, template) {
    const value = event.target.value.trim();
    console.log(value);

    if (value !== '' && event.keyCode === 13) {
      template.searching.set(true);
      searchUser.call(value, (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(res);
        template.searchResults.set(res);
      });
      template.searching.set(false);
    }

    if (value === '') {
      template.searchResults.set([]);
    }
  },

});
