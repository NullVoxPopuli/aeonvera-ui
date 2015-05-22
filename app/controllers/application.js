import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),

  navigation: 'nav/welcome/top-menu',
  mobileMenuLeft: 'nav/welcome/left-items',
  mobileMenuRight: 'nav/welcome/right-items'

});
