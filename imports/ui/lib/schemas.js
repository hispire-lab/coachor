import { SimpleSchema } from 'meteor/aldeed:simple-schema';


const Schemas = {};

Schemas.ChangePassword = new SimpleSchema({
  oldPassword: {
    type: String,
  },
  newPassword: {
    type: String,
  },
  confirmPassword: {
    type: String,
    label: "Enter the password again",
    custom: function () {
      if (this.value !== this.field('newPassword').value) {
        return "passwordMismatch";
      }
    }
  }
});

Schemas.ChangePassword.namedContext('changePasswordForm');
Schemas.EditProfile = new SimpleSchema({
  name: {
    type: String,
  },
  bio: {
    type: String,
    optional: true,
  },
});

Schemas.ChangeUsername = new SimpleSchema({
  username: {
    type: String,
  },
});

Schemas.searchUser = new SimpleSchema({
  name: {
    type: String,
  },
});

SimpleSchema.messages({
  wrongPassword: 'Wrong password',
  passwordMismatch: 'Passwords do not match',
});

export default Schemas;
