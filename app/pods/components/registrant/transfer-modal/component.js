import Component from '@ember/component';

import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';
import { equal } from 'ember-decorators/object/computed';
import { dropTask } from 'ember-concurrency-decorators';

const TO_PERSON = 0;
const TO_YEAR = 1;

export default class extends Component {
  @service('flash-notification') flash;
  @service('authenticated-ajax') ajax;

  transferDestinations = { person: TO_PERSON, year: TO_YEAR };

  year = null;
  email = null;
  firstName = null;
  lastName = null;
  transferTo = TO_PERSON;
  reason = null;

  @equal('transferTo', TO_PERSON) toPerson;
  @equal('transferTo', TO_YEAR) toYear;

  @dropTask
  transferRegistration = function * () {
    const flash = this.get('flash');
    const registration = this.get('registration');
    const id = registration.get('id');
    const eventId = registration.get('host.id');

    const firstName = this.get('firstName');
    const lastName = this.get('lastName');

    const url = `/api/events/registrations/${id}/transfer?event_id=${eventId}`;
    const data = {
      ['transferred_to_email']: this.get('email'),
      ['transferred_to_first_name']: firstName,
      ['transferred_to_last_name']: lastName,
      ['transferred_to_year']: this.get('year'),
      ['transfer_reason']: this.get('reason')
    };

    // try {
    return yield this.get('ajax').PUT(url, data).then(responseData => {

      this.get('store').pushPayload(responseData);
      flash.success('Registration transferred!');
    })
      .catch(flash.error);

    // } catch (e) {
    //   flash.error(e);
    // }

  }

  @action
  submit() {
    const selection = this.get('transferTo');

    if (selection === TO_PERSON) this.clearYearData();
    else if (selection === TO_YEAR) this.clearPersonData();

    return this.get('transferRegistration').perform();
  }

  clearYearData() {
    this.set('year', null);
  }

  clearPersonData() {
    this.set('email', null);
    this.set('firstName', null);
    this.set('lastName', null);
  }
}
