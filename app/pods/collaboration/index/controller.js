import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: {
    token: 'token',
    hostType: 'host_type',
    hostId: 'host_id'
  }
});
