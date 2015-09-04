import Ember from 'ember';

export default Ember.Component.extend({
  title: '',
  name: '',
  role: 'dialog',
  hidden: true,
  reveal: true,

  classNames: ['reveal-modal', 'medium'],

  attributeBindings: [
    'reveal:data-reveal',
    'titleId:aria-labledby',
    'hidden:aria-hidden',
    'role',
    'elementId:id'
  ],

  initFoundation: function() {
		this.$(document).foundation('reflow');
	}.on('didInsertElement'),

  modalName: function(){
    let dashedName = (this.get('name') || '').dasherize();
    let dashedTitle = this.get('title').dasherize();
    return Ember.isPresent(dashedName) ? dashedName : dashedTitle;
  }.property('title', 'name'),


  elementId: function(){
    return this.get('modalName') + '-modal';
  }.property('modalName'),

  titleId: function(){
    return this.get('elementId') + '-title';
  }.property('elementId'),

});
