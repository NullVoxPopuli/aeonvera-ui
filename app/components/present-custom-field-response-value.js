import Ember from 'ember';

export default Ember.Component.extend({
  field: Ember.computed('model', function() {
    return this.get('model.customField');
  })
});
