import Ember from 'ember';

const {isBlank} = Ember;

export default Ember.Component.extend({
  target: null,
  host: null,
  notes: []
});
