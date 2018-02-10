import Component from '@ember/component';

import { service } from 'ember-decorators/service';
import { gt, notEmpty, alias } from 'ember-decorators/object/computed';
import { dropTask } from 'ember-concurrency-decorators';

export default class extends Component {
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

  @dropTask
  markRegistrationAsNotAttending = function * () {
    const registration = this.get('registration');
    const name = registration.get('name');

    registration.set('isAttending', false);
    yield registration.save();

    this.get('router').transitionTo('events.show.registrations');
    this.get('flash').success(`${name} is marked as no longer attending`);
  }

  @dropTask
  updateOrientation = function * (orientation) {
    const flash = this.get('flash');
    const registration = this.get('registration');
    const name = registration.get('name');
    const oldOrientation = registration.get('danceOrientation');

    if (oldOrientation === orientation) return;

    registration.set('danceOrientation', orientation);

    try {
      yield registration.save();

      flash.success(`Updated: ${name} is now dancing (primarily) as a ${orientation}`);
    } catch (e) {
      flash.error(e);
    }
  }
}
