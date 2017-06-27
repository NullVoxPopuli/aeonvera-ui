import Ember from 'ember';
import { alias } from 'ember-computed-decorators';

const { inject } = Ember;

export default class extends Ember.Controller {
  session = inject.service('session');

  @alias('session.currentUser') currentUser;
}
