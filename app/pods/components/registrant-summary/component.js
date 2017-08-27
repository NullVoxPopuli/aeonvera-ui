import Ember from 'ember';

import { service } from 'ember-decorators/service';
import { gt, notEmpty, alias } from 'ember-decorators/object/computed';
import { dropTask } from 'ember-concurrency-decorators';

export default class extends Ember.Component {
  @service('flash-notification') flash;
  @notEmpty('model.levelName') hasLevel;
  @alias('model') registration;
  @gt('registration.orders.length', 0) hasOrders;

  @dropTask
  deleteRegistration = function * () {
    const registration = this.get('registration');

    yield registration.destroyRecord();
    this.get('router').transitionTo('events.show.registrations');
    this.get('flash').success('Registration has been deleted');

  }
}
