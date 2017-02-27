import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: {
    token: 'token',
    hostType: 'host_type',
    hostId: 'host_id'
  }
});
