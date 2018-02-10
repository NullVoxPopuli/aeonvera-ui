import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { assert } from "@ember/debug";
import { isNone } from "@ember/utils";
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

import { action } from 'ember-decorators/object';

import DS from 'ember-data';
import Computed from "@ember/object/computed";
import User from "aeonvera/models/user";

export default class SignupForm extends Component {
	successAction?: any;
  store: Computed<DS.Store> = service('store');
  login = service('login');
  flash = service('flash-notification');

  hasMadeAttempt = false;

  user: User;
  error: string;


  constructor() {
    super();

    this.set('user', this.get('store').createRecord('user'));
  }

  @action
  async register() {
    const { user, login } = this;

    this.set('hasMadeAttempt', true);

    try {
      await user.save();

      this.set('showSignupModal', false);

      await this.login.authenticate({
        identification: user.email,
        password: user.password
      });

      if (this.get('successAction')) {
        this.sendAction('successAction', {});
      }
    } catch (e) {
      this._handleSignupError(e);
    }
  }

  _handleSignupError(error) {
    this.error = error; // user.errors?
  }
}
