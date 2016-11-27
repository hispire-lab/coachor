// server/smtp.js
import { Meteor } from 'meteor/meteor';

Meteor.startup(function () {
  smtp = {
    username: 'tools@hispire.com',   // eg: server@gentlenode.com
    password: 'Tools135*',   // eg: 3eeP1gtizk5eziohfervU
    server:   'vps18600.inmotionhosting.com',  // eg: mail.gandi.net
    port: 465,
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});
