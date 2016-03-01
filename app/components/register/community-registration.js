import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  attendance: Ember.computed(function(){
    return this.store.createRecord('organization-attendance');
  }),

  order: Ember.computed(function(){
    return this.store.createRecord('order');
  })
});
