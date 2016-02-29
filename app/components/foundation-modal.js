  import Ember from 'ember';

export default Ember.Component.extend({
  title: '',
  name: '',
  overrideId: '',
  role: 'dialog',
  hidden: true,
  reveal: true,

  classNames: ['reveal-modal', 'medium'],

  attributeBindings: [
    'reveal:data-reveal',
    'titleId:aria-labledby',
    'hidden:aria-hidden',
    'role',
    'elementId:id',
  ],

  initFoundation: function () {
    this.$(document).foundation('reflow');
  }.on('didInsertElement'),

  modalName: function () {
    let dashedName = (this.get('name') || '').dasherize();
    let dashedTitle = this.get('title').dasherize();
    return Ember.isPresent(dashedName) ? dashedName : dashedTitle;
  }.property('title', 'name'),

  elementId: function () {
    let override = this.get('overrideId');
    if (Ember.isPresent(override)){
      return override;
    }
    let id = this.get('modalName') + '-modal';
    return id;
  }.property('modalName'),

  titleId: function () {
    return this.get('elementId') + '-title';
  }.property('elementId'),

});
