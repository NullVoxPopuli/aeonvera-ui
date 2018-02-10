import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import { readOnly } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

export default Mixin.create({
  session: service('session'),
  currentUserService: service('current-user'),

  @readOnly
  @alias('currentUserService.user') currentUser: null,

  @readOnly
  @alias('currentUserService.name') currentUserName: null,

  @readOnly
  @alias('currentUserService.email') currentUserEmail: null,

  @readOnly
  @alias('session.isAuthenticated') loggedIn: null

});
