import Ember from 'ember';
import Sidebar from 'aeonvera/mixins/routes/set-navbar-title';

export default Ember.Route.extend(Sidebar, {
  afterModel() {
    this._hideSideNav();
  }
});
