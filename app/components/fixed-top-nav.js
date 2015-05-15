import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['fixed'],

  backLinkPath: function() {
    return 'welcome';
  }.property(),

  backLinkText: function() {
    return this.t('appname');
  }.property()
});
