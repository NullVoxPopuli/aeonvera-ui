import Ember from 'ember';
import { alias, readOnly } from 'ember-computed-decorators';

const { inject } = Ember;

export default Ember.Mixin.create({
  session: inject.service('session'),
  currentUserService: inject.service('current-user'),

  @readOnly
  @alias('currentUserService.user') currentUser,

  @readOnly
  @alias('currentUserService.name') currentUserName,

  @readOnly
  @alias('currentUserService.email') currentUserEmail,

  @readOnly
  @alias('session.isAuthenticated') loggedIn

});
