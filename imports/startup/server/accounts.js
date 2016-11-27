import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  if (user.services.facebook) {
    // here we create our email object like the schema
    // and set verified to true after the successfult OAuth
    // returns the data from facebook.
    user.emails = [{
      address: user.services.facebook.email,
      verified: true,
    }];

    // We need to create our username from facebook response
    // first and last name for example (seen in mostly of the apps that use oauth)
    const { first_name, last_name } = user.services.facebook;
    user.username = first_name.toLowerCase() + ' ' + last_name.toLowerCase();
    user.name = first_name.toLowerCase() + ' ' + last_name.toLowerCase();
    user.socialLogin = true;
  } if (user.services.google) {
    // NOTE Google returns a "verified_email" boolean with the response object,
    // Facebook doesn't
    user.emails = [{
      address: user.services.google.email,
      verified: true,
    }];
    const { name } = user.services.google;
    user.username = name.toLowerCase();
    user.name = name.toLowerCase();
    user.socialLogin = true;
  }
  return user;
});
