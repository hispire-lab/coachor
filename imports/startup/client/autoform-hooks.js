import { AutoForm } from 'meteor/aldeed:autoform';
import { Accounts } from 'meteor/accounts-base';
import { FlashMessages } from 'meteor/mrt:flash-messages';
import Schemas from '../../ui/lib/schemas.js';

AutoForm.hooks({
  changePasswordForm: {
    onSubmit(insertDoc, updateDoc, currentDoc) {
      console.log(insertDoc);
      Accounts.changePassword(insertDoc.oldPassword, insertDoc.newPassword, (err) => {
        if (err) {
          Schemas.ChangePassword.namedContext('changePasswordForm').addInvalidKeys([{name: "oldPassword", type: "wrongPassword"}]);
          this.done(new Error(err));
        } else {
          this.done();
        }
      });
      return false;
    },
    onSuccess(formType, result) {
      FlashMessages.sendSuccess('Password changed successfully');
    },
  },
  changeUsernameForm: {
    onSuccess(formType, result) {
      FlashMessages.sendSuccess('Username changed successfully');
    },
  },
  editProfileForm: {
    onSuccess(formType, result) {
      FlashMessages.sendSuccess('Profile updated successfully');
    },
  },
});
