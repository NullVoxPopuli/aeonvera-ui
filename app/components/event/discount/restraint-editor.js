import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  restraints: Ember.computed('model.restraints', function(){
    return this.get('model.restraints');
  }),

  actions: {
    addNew(){
      let newRestraint = this.get('store').createRecord('restraint');
      newRestraint.set('restrictionFor', this.get('model'));
      let restraints = this.get('restraints');
      restraints.pushObject(newRestraint);
    }
  }
});
