import Ember from 'ember';
import Random from 'aeonvera/mixins/helpers/string';

export default Ember.Component.extend(Random, {
  attributeBindings: [
    'data-tooltip',
    'data-width',
    'title',
    'id',
  ],
  tagName: 'span',
  classNames: ['has-tip'],

  title: Ember.computed.alias('message'),

  'data-width': function () {
    return (this.get('width') || 200);
  }.property('width'),

  initFoundation: function () {
    this.$(document).foundation('reflow');
  }.on('didInsertElement'),

});
