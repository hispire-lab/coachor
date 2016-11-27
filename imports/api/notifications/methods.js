import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Notifications } from './notifications.js';

const addNotification = new ValidatedMethod({
  name: 'Notifications.methods.addNotification',
  validate() {
  },
  run({ text, users }) {
    console.log('screen notify: ', text);
    return Notifications.insert({
      sender: 'push',
      text,
      users,
    });
  },
});
const readed = new ValidatedMethod({
  name: 'Notifications.methods.readed',
  validate() {
  },
  run({ notificationId }) {
    console.log('readed');
    return Notifications.update({ _id: notificationId }, {
      $set: { isRead: true },
    });
  },
});

const serverNotification = new ValidatedMethod({
  name: 'Notifications.methods.serverNotification',
  validate() {
  },
  run({ text,title, query, users }) {
    console.log('users: ', users);
    console.log('notifying...', text, title);
    let badge = 1;
    Push.send({
    from: 'push',
    title: title,
        text: text,
        badge: badge,
        sound: 'sound',
        payload: {
            title: title
        },
        query: {userId: {$in : users}}
    });
    users.forEach((user) => {
      console.log(user);
      Notifications.insert({
          sender: 'push',
          text: text,
          userId: user
      });
    });
  }
});
const userNotification = new ValidatedMethod({
  name: 'Notifications.methods.userNotification',
  validate() {
  },
  run({text,title, userId}) {
    Notifications.insert({
        sender: 'push',
        text: text,
        userId: userId
    });
  },
});
export { serverNotification, userNotification, addNotification, readed };
