import Ember from 'ember';
import AuthenticatedUi from 'aeonvera/mixins/authenticated-ui';

export default Ember.Route.extend(AuthenticatedUi, {
  i18n: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  activate: function () {
    this.set('title', this.get('i18n').t('attendedevents'));

    this.controllerFor('application').set('mobileMenuLeft',
      'nav/dashboard/left-items');

    this._super();
  },

  actions: {
    updateCurrentUser: function () {
      var store = this.get('store');

      store.find('user', 0).then(user => {
        user.save().then(_ => {
          this.get('flashMessages').success('Profile updated!');
        }, error => {
          this.get('flashMessages').alert('Profile did not update.');
        });
      });
    }
  },
});
