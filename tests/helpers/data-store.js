import { registerHelper } from '@ember/test';

export default registerHelper('dataStore', function(app) {
  return app.__container__.lookup('service:store');
});
