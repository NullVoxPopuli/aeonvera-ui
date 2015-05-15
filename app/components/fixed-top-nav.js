import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'div',
	classNames: ['fixed'],

	backLinkPath: function() {
		return 'welcome';
	}.property(),

	backLinkText: function() {
		return this.t('appname');
	}.property(),

	hasLeftMobileMenu: function() {
		return !Ember.isEmpty(this.get('left'));
	}.property(),

	hasRightMobileMenu: function() {
		return !Ember.isEmpty(this.get('right'));
	}.property()
});
