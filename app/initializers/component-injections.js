import DS from 'ember-data';

export function initialize(application) {
  // Injects all Ember components with a router object:
  application.inject('component', 'router', 'router:main');
  application.inject('component', 'store', 'service:store');

}

export default {
  name: 'component-router-injector',
  initialize: initialize
};
