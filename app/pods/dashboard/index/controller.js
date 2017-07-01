import Ember from 'ember';
import { alias } from 'ember-computed-decorators';

const { inject } = Ember;

export default Ember.Controller.extend({
  session: inject.service('session'),

  @alias('session.currentUser') currentUser: null
});
