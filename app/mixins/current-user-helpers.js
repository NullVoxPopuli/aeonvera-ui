import Ember from 'ember';
import { readOnly } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

const { inject } = Ember;

export default Ember.Mixin.create({
  session: inject.service('session'),
  currentUserService: inject.service('current-user'),

  @readOnly
  @alias('currentUserService.user') currentUser: null,

  @readOnly
  @alias('currentUserService.name') currentUserName: null,

  @readOnly
  @alias('currentUserService.email') currentUserEmail: null,

  @readOnly
  @alias('session.isAuthenticated') loggedIn: null

});
