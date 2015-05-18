import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['fixed'],

  backLinkPath: function() {
    if (this.get('session').isAuthenticated) {
      return '/';
    } else {
      return 'welcome';
    }
  }.property(),

  backLinkText: function() {
    return this.t('appname');
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
