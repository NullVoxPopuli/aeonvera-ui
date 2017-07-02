import Ember from 'ember';
import { alias, or } from 'ember-decorators/object/computed';
import { task, timeout } from 'ember-concurrency';

const DEBOUNCE_MS = 500;

const { isBlank, Controller } = Ember;

export default class extends Controller {
  @alias('model.initialOrders') initialOrders;
  @alias('model.hostId') hostId;
  @alias('model.hostType') hostType;
  @alias('searchOrders.lastSuccessful.value') searchResults;
  @or('searchResults', 'initialOrders') orders;

  searchOrders = task(function * (query, skipDebounce = false) {
    if (isBlank(query)) return;
    if (!skipDebounce) yield timeout(DEBOUNCE_MS);

    return yield this.get('store').query('order', {
      q: query,
      include: 'order_line_items.line_item'
    });
  }).restartable()
}
