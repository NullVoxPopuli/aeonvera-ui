import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import Random from 'aeonvera/mixins/helpers/string';

export default Component.extend(Random, {
  attributeBindings: [
    'data-tooltip',
    'data-width',
    'title',
    'id'
  ],
  tagName: 'span',
  classNames: ['has-tip'],

  title: alias('message'),

  'data-width': function() {
    return (this.get('width') || 200);
  }.property('width'),
});
