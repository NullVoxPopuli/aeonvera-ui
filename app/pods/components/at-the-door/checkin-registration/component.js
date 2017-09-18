import Component from '@ember/component';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

import { dropTask } from 'ember-concurrency-decorators';

export default class extends Component {
  @service('flash-notification') flash;
  @service('authenticated-ajax') ajax;

  tagName = 'tr';

  @action
  checkin() {
    this.get('putToRegistration').perform('checkin', {
      checked_in_at: new Date(),
    });
  }

  @action
  uncheckin() {
    this.get('putToRegistration').perform('uncheckin');
  }

  @dropTask
  putToRegistration = function * (path, params = {}) {
    const id = this.get('model.id');
    const name = this.get('model.name');
    const eventId = this.get('model.host.id');
    const url = '/api/events/registrations/' + id + `/${path}`;
    const data = {
      ...params,
      event_id: eventId
    };

    try {
      const response = yield this.get('ajax').PUT(url, data);

      this.get('store').pushPayload(response);
      this.get('flash').success(`${name} has been checked in.`);
    } catch (e) {
      const json = JSON.parse(e.responseText);

      this.get('flash').alert(json);
    }
  }
}
