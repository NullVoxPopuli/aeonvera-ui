import Ember from 'ember';
import { alias, readOnly } from 'ember-computed-decorators';

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
