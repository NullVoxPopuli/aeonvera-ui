import Ember from 'ember';

export default Ember.Component.extend({
  i18n: Ember.inject.service(),
  session: Ember.inject.service('session'),


  tagName: 'div',
  classNames: ['fixed'],

  backLinkPath: function() {
    if (this.get('session').isAuthenticated) {
      return 'dashboard';
    } else {
      return 'welcome';
    }
  }.property(),

  backLinkText: function() {
    return this.get('i18n').t('appname');
  }.property(),

  hasLeftMobileMenu: function() {
    return !Ember.isEmpty(this.get('left'));
  }.property(),

  hasRightMobileMenu: function() {
    return !Ember.isEmpty(this.get('right'));
  }.property(),

  actions: {
    goToRoute: function(path) {
      this.transitionTo(path);
    }
  }
});
