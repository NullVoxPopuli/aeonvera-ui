import Ember from 'ember';
import AuthenticatedUi from 'aeonvera/mixins/authenticated-ui';

export default Ember.Route.extend(AuthenticatedUi, {
  i18n: Ember.inject.service(),

  actions: {
  }

});
