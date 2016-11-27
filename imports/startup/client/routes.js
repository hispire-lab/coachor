import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import '../../ui/layouts/appLayout';
import '../../ui/layouts/settingsLayout';
import '../../ui/pages/homePage';
import '../../ui/pages/auth';
import '../../ui/containers/settings/profilePageContainer';
import '../../ui/containers/settings/accountPageContainer';
import '../../ui/containers/user/userPageContainer';
import '../../ui/containers/user/connectionsPageContainer';
import '../../ui/components/nav';
import '../../ui/components/footer';

FlowRouter.route('/', {
  name: 'App.home_page',
  action() {
    BlazeLayout.render('appLayout', {
      footer: 'footer',
      main: 'homePage',
      nav: 'nav',
    });
  },
});

FlowRouter.route('/settings', {
  name: 'App.settings',
  action() {
    FlowRouter.go('App.settings.profile');
  },
});
FlowRouter.route('/settings/profile', {
  name: 'App.settings.profile',
  action() {
    BlazeLayout.render('appLayout', {
      footer: 'footer',
      main: 'profilePageContainer',
      nav: 'nav',
    });
  },
});
FlowRouter.route('/settings/account', {
  name: 'App.settings.account',
  action() {
    BlazeLayout.render('appLayout', {
      footer: 'footer',
      main: 'accountPageContainer',
      nav: 'nav',
    });
  },
});

FlowRouter.route('/connections', {
  name: 'App.connections',
  action() {
    BlazeLayout.render('appLayout', {
      footer: 'footer',
      main: 'connectionsPageContainer',
      nav: 'nav',
    });
  },
});

// TODO if you use :username as param instead of /user/:username
// sign-in route stops working
FlowRouter.route('/user/:username', {
  name: 'App.user',
  action(params, queryParams) {
    BlazeLayout.render('appLayout', {
      footer: 'footer',
      main: 'userPageContainer',
      nav: 'nav',
    });
  },
});

FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn], {
  except: ['App.home_page', 'signIn', 'signUp'],
});
