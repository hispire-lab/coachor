import { AccountsTemplates } from 'meteor/useraccounts:core';
import { T9n } from 'meteor/softwarerero:accounts-t9n';
/*
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});
*/


const pwd = AccountsTemplates.removeField('password');
AccountsTemplates.configure({
  defaultLayout: 'appLayout',
  defaultLayoutRegions: {
    footer: 'footer',
  },
  defaultContentRegion: 'main',
  sendVerificationEmail: true,
  lowercaseUsername: false,
  focusFirstInput: true,
  enablePasswordChange: true,

  // Appearance
  showResendVerificationEmailLink: true,
  showForgotPasswordLink: true,

  // Client-side Validation
  continuousValidation: false,
  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: true,
  showValidating: true,
});

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');

AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id: 'username',
    type: 'text',
    displayName: 'username',
    required: true,
    minLength: 5,
  },
  {
    _id: 'email',
    type: 'email',
    required: true,
    displayName: 'email',
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'Invalid email',
  },
  {
    _id: 'username_and_email',
    type: 'text',
    required: true,
    placeholder: 'Username or email address',
    displayName: 'username_and_email',
  },
  pwd,
]);

T9n.map('en', {
  username_and_email: 'Username or email address',
  error: {
    accounts: {
      'Login forbidden': 'Incorrect email or username',
    },
  },
});
T9n.map('es', {
  username_and_email: 'Usuario o correo electronico',
  error: {
    accounts: {
      'Login forbidden': 'Nombre de usuario o email incorrecto',
    },
  },
});
