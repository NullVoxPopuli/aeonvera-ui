import Ember from 'ember';

export default Ember.Object.extend({
  store: Ember.inject.service(),

  open(authentication){
    let store = this.get('store');
    let integration = store.createRecord('integration', authentication);
    integration.save();
    return integration;
  }
});
