import Ember from 'ember';

export default Ember.Route.extend( {
  userService: Ember.inject.service('current-user'),

  model: function (params) {
    return this.store.findRecord('order', params.order_id);
  },
});
