import { Template } from 'meteor/templating';

Template.registerHelper('consoleLog', o => console.log(o));
