import { registerHelper } from '@ember/test';

export default registerHelper('serviceNamed', function(app, name) {
  return app.container.lookup('service:' + name);
});
