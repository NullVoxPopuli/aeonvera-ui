import Controller from '@ember/controller';
import { isPresent } from '@ember/utils';
import RSVP from 'rsvp';

import { computed, readOnly } from 'ember-decorators/object';
import { alias, oneWay, sort } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

import { dropTask } from 'ember-concurrency-decorators';

import { UNREGISTERED_ID } from 'aeonvera/models/registration';

export default class extends Controller {
  @service('flash-notification') flash;

  @alias('model.event') event;
  @alias('model.registration') registration;

  @dropTask
  submitFormTask = function * () {
    const flash = this.get('flash');
    const registration = this.get('registration');

    const saved = yield registration.save();

    return this.transitionToRoute('register.event-registration.show.edit.ticket', saved.id);
  }
}
