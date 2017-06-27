import { module } from 'qunit';
import Ember from 'ember';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

//import { startMirage } from 'aeonvera/initializers/ember-cli-mirage';

const { RSVP: { Promise } } = Ember;

export default function(name, options = {}) {
  let application = null;
  let server = null;

  module(name, {
    beforeEach() {
      application = startApp();
  //    server = startMirage();

      if (options.beforeEach) {
        return options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);

    //  server.shutdown();

      return Promise.resolve(afterEach).then(() => destroyApp(application));
    }
  });

  return { application, server };
}
