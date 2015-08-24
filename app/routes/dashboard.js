import Ember from 'ember';
import AuthenticatedUi from '../mixins/authenticated-ui';

export default Ember.Route.extend(AuthenticatedUi, {
  activate: function(){
    this.set('title', this.t('dashboard'));

    var dashboard = this.controllerFor('dashboard');
    dashboard.set('sidebar', 'sidebar/dashboard-sidebar');

    this._super();
  }

});
