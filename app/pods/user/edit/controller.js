import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  deleteAccountPassword: '',
  deleteErrors: [],
  actions: {
    deactivateAccount: function() {
      const store = this.get('store');

      store.find('user', 0).then(user => {
        this.get('ajax')
          .del('users/current-user', {data: {password: this.get('deleteAccountPassword')}})
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

    }
  }
});
