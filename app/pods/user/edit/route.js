import Ember from 'ember';
import RSVP from 'rsvp';
import AuthenticatedUi from 'aeonvera/mixins/authenticated-ui';

export default Ember.Route.extend(AuthenticatedUi, {
  currentUserService: Ember.inject.service('current-user'),

  model() {
    const user = this.get('currentUserService.user');

    return RSVP.hash({
      user
    });
  }
});
