import Ember from 'ember';
import AuthenticatedUi from '../../mixins/authenticated-ui';

export default Ember.Route.extend(AuthenticatedUi, {
  i18n: Ember.inject.service(),

  activate: function() {

    this.set('title', this.get('i18n').t('attendedevents'));

    this.controllerFor('application').set('mobileMenuLeft',
      'nav/dashboard/left-items');

    this._super();
  },

  actions: {
    updateCurrentUser: function(){
      var store = this.get('store');

      store.find('user', 0).then(function(user){
        user.save();
      });
    },

    deactivateAccount: function(){
      var store = this.get('store');
      var self = this;

      store.find('user', 0).then(function(user){
        user.deleteRecord();
        user.save().then(function(){
          self.send('invalidateSession');
        });
      });
    }
  }
});
