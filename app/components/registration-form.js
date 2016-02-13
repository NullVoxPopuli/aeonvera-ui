import Ember from 'ember';

export default Ember.Component.extend({
  title: Ember.computed('model.name', {
    return 'Register for ' + this.get('model.name');
  }).readOnly(),
});
