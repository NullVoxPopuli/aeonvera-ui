import Ember from 'ember';

import { action } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

export default class extends Ember.Controller {
  @service('flash-notification') flashMessages;
  @service('session') session;
  @service('navbar-title') navbarTitle;

  @alias('navbarTitle.showSidebar') showSidebar;
  @alias('navbarTitle.navTitle') navTitle;
  @alias('navbarTitle.title') title;

  @action
  transitionToLoginRoute() {
    this.transitionToRoute('login');
  }

  @action
  logoutAndRedirect() {
    this.get('session').invalidate();
    this.transitionToRoute('welcome');
  }

  @action
  newUserRegistered() {
    /*
      success
      - hide the modal
      - notify of confirmation email
    */
    this.get('flashMessages').success(
      'You will receive an email with instructions about how to confirm your account in a few minutes.'
    );

    jQuery('#signup-modal a.close-reveal-modal').trigger('click');
  }
}
