import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

import { alias } from 'ember-decorators/object/computed';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  flash: Ember.inject.service('flash-notification'),

  @alias('model.user') user: null,

  deleteAccountPassword: '',
  deleteErrors: [],
  actions: {
    deactivateAccount: function() {
      this.get('user').then(user => {
        this.get('ajax')
          .del('users/current-user', { data: { password: this.get('deleteAccountPassword') } })
          .then(success => {
            // clear from the store
            user.deleteRecord();

            // update ui stuff
            Ember.$('.close-reveal-modal').click();
            this.send('invalidateSession');
          })
          .catch(error => {
            this.set('deleteErrors', error.errors);
          });
      });

    },

    updateCurrentUser: function() {
      const user = this.get('user');

      user.save().then(_ => {
        this.get('flash').success('Profile updated!');
      }, error => {
        this.get('flash').alert('Profile did not update.');
      });
    }
  }
});
