import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './notification.html';
import { readed, userNotification } from '../../../api/notifications/methods.js';
import { acceptConnection } from '../../../api/users/methods.js';


/* Template.notification.helpers({
  notifications() {
    return Template.instance().data;
  },
  notificationsCount() {
    return Template.instance().data.length;
  },
});*/

Template.notification.events({
  'click .js-accept-invitation'(event) {
    const userId = $(event.target).attr('data-userId');
    console.log(Meteor.user());
    const username = Meteor.user().username;
    const notId = Template.instance().data._id;
    acceptConnection.call({
      userId,
    }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        userNotification.call({
          title: 'Connection invitation accepted',
          text: '<h5>' + username + ' accepted your invitation! :)</h5>',
          userId,
        }, (err, res) => {
          if (err) {
            console.log(err);
          }
          else {
            readed.call({
              notificationId: notId,
            }, (err, res) => {
              if (err) {
                console.log(err);
              } else {
                Materialize.toast('Connection accepted!', 3000);
              }
            });
          }
        });
      }
    });
  },
  'click .js-hide-invitation'(event) {
    const notId = Template.instance().data._id;
    readed.call({
      notificationId: notId,
    }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Hidden');
      }
    });
    console.log('Rejected', userId);
  },
  'click .js-close-notification'(event) {
    const notId = Template.instance().data._id;
    readed.call({
      notificationId: notId,
    }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Readed');
      }
    });
  },
});
