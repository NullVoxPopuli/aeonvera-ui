import Ember from 'ember';
import AuthenticatedUi from '../mixins/authenticated-ui';

export default Ember.Route.extend(AuthenticatedUi, {
  i18n: Ember.inject.service(),

  activate: function(){
    this.set('title', this.get('i18n').t('dashboard'));

    var dashboard = this.controllerFor('dashboard');
    dashboard.set('sidebar', 'sidebar/dashboard-sidebar');

    this._super();
  },

  actions: {
    setSidebar: function(name){
      var dashboard = this.controllerFor('dashboard');

      dashboard.set('sidebar', name);
    },

    setData: function(data){
      var dashboard = this.controllerFor('dashboard');

      dashboard.set('data', data);
    }
  }

});
