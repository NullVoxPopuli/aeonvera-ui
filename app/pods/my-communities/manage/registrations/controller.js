import Ember from 'ember';
import { alias, or } from 'ember-computed-decorators';
import { task, timeout } from 'ember-concurrency';

const DEBOUNCE_MS = 500;

const { isBlank } = Ember;

export default Ember.Controller.extend({
  @alias('model.organization') organization: null,
  @alias('model.initialOrders') initialOrders: null,
  @alias('model.hostId') hostId: null,
  @alias('model.hostType') hostType: null,
  @alias('searchOrders.lastSuccessful.value') searchResults: null,
  @or('searchResults', 'initialOrders') orders: null,
  //
  // init() {
  //   this._super();
  //
  //   const defaultParams = {
  //     host_id_eq: this.get('hostId'),
  //     host_type_eq: this.get('hostType')
  //   };
  //
  //   this.get('searchOrders').perform(defaultParams, true);
  //   Ember.run.schedule('afterRender', this, () => this.set('something', foo))
  // },

  searchOrders: task(function * (query, skipDebounce = false) {
    if (isBlank(query)) return;
    if (!skipDebounce) yield timeout(DEBOUNCE_MS);

    return yield this.get('store').query('order', {
      q: query,
      include: 'order_line_items.line_item'
    });
  }).restartable()
});
