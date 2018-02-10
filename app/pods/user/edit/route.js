import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedUi from 'aeonvera/mixins/authenticated-ui';

export default Route.extend(AuthenticatedUi, {
  currentUserService: service('current-user'),

  model() {
    const user = this.get('currentUserService.user');

    return RSVP.hash({
      user
    });
  }
});
