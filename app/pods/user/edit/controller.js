import $ from 'jquery';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ENV from 'aeonvera/config/environment';

import { alias } from 'ember-decorators/object/computed';

export default Controller.extend({
  ajax: service(),
  flash: service('flash-notification'),

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
            $('.close-reveal-modal').click();
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
