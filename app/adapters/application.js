import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  namespace: 'api',
  host: 'https://aeonvera.com'
  // host: 'http://swing.vhost:3000'
});
