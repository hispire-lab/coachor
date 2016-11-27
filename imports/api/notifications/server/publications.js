import { Meteor } from 'meteor/meteor';
import { Notifications } from '../notifications.js';

Meteor.publish('notifications.user', function (userId) {
  console.log(userId);
  return Notifications.find({
    $and: [{ userId: { $eq: userId } }, { isRead: { $eq: false } }]
  }, {
    sort: { createdAt: -1 },
  });
});

/*Meteor.publish('notifications.driver', function (driverId) {
  if (Roles.userIsInRole(this.userId, ['driver'])) {
    return Orders.find({ $or: [{driver: driverId},{$or:[{status: 'new'},{status: 'washed'}, {status: 'pickup rejected'}, {status: 'delivery rejected'}, {status: 'delivery rejected'}]}]},{sort: {createdAt: -1}});
  } else {
    // user not authorized.
    return this.ready();
  }
});

Meteor.publish('orders.la', function (laId) {
  if (Roles.userIsInRole(this.userId, ['la'])) {
    return Orders.find({}, {sort: {createdAt: -1}});
  } else {
    // user not authorized.
    return this.ready();
  }
});*/
