import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { T9n } from 'meteor/softwarerero:accounts-t9n';
import './footer.html';

Template.footer.events({
  'click .js-toggle-language'(event) {
    const language = $(event.target).html().trim();
    T9n.setLanguage(language);
  },
});
