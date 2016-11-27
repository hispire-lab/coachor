import { Template } from 'meteor/templating';
import { connectUser, disconnectUser } from '../../../api/users/methods.js';
import { userNotification } from '../../../api/notifications/methods.js';
import './userPage.html';

Template.userPage.onCreated(() => {
  Template.instance().checkConnectionStatus = () => {
    let connectionStatus = {};
    const userId = Template.instance().data.userData._id;
    const currentUserConnections = Template.instance().data.currentUserData.connections || [];
    if (currentUserConnections.length > 0) {
      currentUserConnections.every((connection) => {
        if (connection.userId === userId) {
          connectionStatus = connection;
          return false;
        } else {
          return true;
        }
      });
    }
    return connectionStatus;
  };
});

Template.userPage.helpers({
  checkConnectionStatus() {
    console.log(Template.instance().checkConnectionStatus());
    return Template.instance().checkConnectionStatus();
  },
});

Template.userPage.events({
  'click .js-add-user'(event) {
    if (Template.instance().checkConnectionStatus.invited) {
      Materialize.toast('Already invited', 3000);
    } else {
      const userId = $(event.target).attr('data-userId');
      const username = Template.instance().data.currentUserData.username;
      const currentUserId = Template.instance().data.currentUserData._id;
      connectUser.call({ userId }, (err, res) => {
        if (err) {
          console.log(err);
        }
        userNotification.call({
          title: 'Connection invitation',
          text: '<h5>' + username + ' want to connect</h5><li><a class="js-accept-invitation green white-text" data-userId="' + currentUserId + '"><i class="material-icons left" data-userId="' + currentUserId + '">add</i>Accept invitation</a></li> <li><a class="js-hide-invitation red white-text" data-userId="' + currentUserId + '"><i class="material-icons left" data-userId="' + currentUserId + '">remove</i>Delete request</a></li>',
          userId,
        }, (err, res) => {
          if (err) {
            console.log(err);
          }
          else {
            Materialize.toast('Invitation to conenct sent!', 3000);
          }
        });
      });
    }
  },

  'click .js-disconnect-user'(event) {
    const userId = $(event.target).attr('data-userId');
    disconnectUser.call({ userId }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        Materialize.toast('Connection removed', 3000);
      }
    });
  },
});
