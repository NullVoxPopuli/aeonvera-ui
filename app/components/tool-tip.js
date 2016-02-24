import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: [
    'data-tooltip',
    'data-width',
    'title',
    'id',
  ],
  tagName: 'span',
  classNames: ['has-tip'],

  title: Ember.computed.alias('message'),

  // each tooltip must be unique
  'data-tooltip': Ember.computed(function () {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0,
      64);
  }),

  'data-width': function () {
    return (this.get('width') || 200);
  }.property('width'),

  initFoundation: function () {
    this.$(document).foundation('reflow');
  }.on('didInsertElement'),

});
