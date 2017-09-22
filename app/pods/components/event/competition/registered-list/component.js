import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';

import { alias } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

export default class extends Component {
  @service('flash-notification') flash;
  @service('authenticated-ajax') ajax;

  @alias('competition') model;

  columns = [
    { property: 'order.userName', title: 'Name' },
    { property: 'danceOrientation', title: 'Orientation', showOn: 'model.requiresOrientation' },
    { property: 'partnerName', title: 'Partner', showOn: 'model.requiresPartner' },
    { property: 'order.registration.isCheckedIn', title: 'Checked In?' },
    { property: 'order.paymentReceivedAt', title: 'Paid At' }
  ];

  @dropTask
  scratch = function * (oli) {
    const flash = this.get('flash');
    const scratch = true;

    oli.set('scratch', scratch);

    const id = oli.get('id');
    const url = '/api/order_line_items/' + id + `/update_non_payment`;
    const data = { data: { attributes: { scratch } } };

    try {
      const response = yield this.get('ajax').PUT(url, data);

      this.get('store').pushPayload(response);
      this.get('flash').success('Competitor is a scratch');
    } catch (e) {
      const json = JSON.parse(e.responseText);
      oli.set('scratch', !scratch);
      this.get('flash').alert(json);
    }
  }

  @dropTask
  unscratch = function * (oli) {
    const flash = this.get('flash');
    const scratch = false;
    oli.set('scratch', scratch);

    const id = oli.get('id');
    const url = '/api/order_line_items/' + id + `/update_non_payment`;
    const data = { data: { attributes: { scratch } } };

    try {
      const response = yield this.get('ajax').PUT(url, data);

      this.get('store').pushPayload(response);
      this.get('flash').success('Competitor is no longer a scratch');
    } catch (e) {
      const json = JSON.parse(e.responseText);
      oli.set('scratch', !scratch);
      this.get('flash').alert(json);
    }
  }
}
