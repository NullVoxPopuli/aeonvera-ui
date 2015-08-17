import Ember from 'ember';
import AuthenticatedUi from '../mixins/authenticated-ui';

export default Ember.Route.extend(AuthenticatedUi, {
  activate: function(){
    this.set('title', this.t('dashboard'));
    this._super();
  },

  model: function(){
    var attended = this.store.findAll('attended-event');
    var hosted = this.store.findAll('hosted-event');

    return {
      attended: attended,
      hosted: hosted
    };
  }

});
