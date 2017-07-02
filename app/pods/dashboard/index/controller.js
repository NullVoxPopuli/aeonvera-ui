import Ember from 'ember';
import { alias } from 'ember-decorators/object/computed';

const { inject } = Ember;

export default Ember.Controller.extend({
  session: inject.service('session'),

  @alias('session.currentUser') currentUser: null
});
