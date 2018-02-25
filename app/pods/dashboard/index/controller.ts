import Controller from '@ember/controller';

import { computed } from '@ember-decorators/object';
import { alias } from '@ember-decorators/object/computed';

export default class DashboardController extends Controller {
  @alias('session.currentUser') currentUser;
  @alias('model.upcoming') upcomingEvents;
  @alias('model.hosted') hostedEvents;
  @alias('model.registrations') registrations;

  @computed('registrations')
  get numberOfRegistrations() {
    const registrations = this.get('registrations');

    return registrations.get('length');
  }

  @computed('hostedEvents')
  get numberOfHostedEvents() {
    const hostedEvents = this.get('hostedEvents');

    return hostedEvents.get('length');
  }

  @computed('hostedEvents')
  get upcomingHostedEvents() {
    const hostedEvents = this.get('hostedEvents');
    const now = new Date();

    return hostedEvents.filter(hostedEvent => {
      return hostedEvent.get('startsAt') > now;
    });
  };
}
