import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    openLoginModal(){
      Ember.$('.auth-link a.login').click();
    }
  }
});
