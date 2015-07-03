import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service(),

  navigation: 'fixed-top-nav',
  mobileMenuLeft: 'nav/welcome/left-items',
  mobileMenuRight: 'nav/welcome/right-items'


});
