import Controller from '@ember/controller';

import { computed } from '@ember-decorators/object';
import { gt, alias, filter, empty, mapBy } from '@ember-decorators/object/computed';

export default class HostedEvents extends Controller {
  showMyEvents = false;

  @alias('model') events;

  @gt('events.length', 0) hasHelpedOrganizeAnEvent;

  @mapBy('events', 'myEvent') boolMyEvents;

  @filter('boolMyEvents')
  notHostedByMe(myEventValue) {
    return myEventValue === false
  }

  @empty('notHostedByMe') hasHostedAnEvent;

  @computed('events.[]', 'showMyEvents')
  get filteredEvents() {
    const events = this.get('events');
    const onlyMe = this.get('showMyEvents');

    if (onlyMe) {
      return events.filter(e => e.get('myEvent'));
    }

    return events;

  }
}
