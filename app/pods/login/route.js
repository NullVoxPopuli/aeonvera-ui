import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

import Sidebar from 'aeonvera/mixins/routes/set-navbar-title';

export default Ember.Route.extend(UnauthenticatedRouteMixin, Sidebar, {
  beforeModel() {
    this._hideSideNav();
  }
});
