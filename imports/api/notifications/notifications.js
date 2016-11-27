import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class NotificationsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const notification = doc;
    notification.createdAt = notification.createdAt || new Date();
    notification.isRead = false;
    const result = super.insert(notification, callback);
    return result;
  }
}

const Notifications = new NotificationsCollection('Notifications');

/*
 * example of notification:
 *
 * objectType -> Pin 'PinFavorited'
 * subject -> 'Your pin has been favorited'
 * body -> '<User X> has favorited your Caramel Cream Cakes pin!'
 */
 /*
  * TODO: add notification types like PinLiked or UserFollowing,
  * each type of notification can have his own custom subject and body.
  * i.e (PinLiked):
  *   subject -> Your pin[href=pinURL] has been liked.
  *   body -> John[href=userURL] likes your pin[href=pinURL]
  *
  * group related notifications in order to avoid notification spam
  * enable global notifications, that is notifications that are published
  * to all users.
  * create a notifdication resume in order to send it via email.
  */
Notifications.schema = new SimpleSchema({
  userId: {
    type: String,
    regEx: [SimpleSchema.RegEx.Id],
  },
  sender: {
    type: String,
  },
  text: {
    type: String,
    optional: true,
  },
  isRead: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
});

Notifications.attachSchema(Notifications.schema);

Notifications.helpers({});

export { Notifications };
