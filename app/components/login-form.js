import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),

  showErrorMessage: function(){
    let msg = this.get('errorMessage');
    return Ember.isBlank(msg) ? 'error-message-hidden' : '';
  }.property('errorMessage'),

	actions: {
		authenticate: function() {
			let { identification, password } = this.getProperties('identification', 'password');
			this.get('session').authenticate('authenticator:devise', identification, password)
				.catch((reason) => {
					this.set('errorMessage', reason.error);
			}).then(function(){
        // close the modal
        Ember.$('a.close-reveal-modal').trigger('click');
      });
		},

    hideError: function(){
      this.set('errorMessage', '');
    }
	}
});
