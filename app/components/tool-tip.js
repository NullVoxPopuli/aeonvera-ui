import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: [
    "data-tooltip",
    "data-width",
    "title"
  ],
  tagName: 'span',
  classNames: ['has-tip'],
  "data-tooltip": true,
  title: Ember.computed.alias('message'),

  "data-width": function() {
    return (this.get('width') || 200);
  }.property('width')


});
