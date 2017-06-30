import Ember from 'ember';
import { alias } from 'ember-computed-decorators';
import { task, timeout } from 'ember-concurrency';

const DEBOUNCE_MS = 500;

const { isBlank } = Ember;

export default Ember.Controller.extend({
  @alias('model.organization') organization: null,

  // TODO: for later
  searchOrders: task(function * (query, skipDebounce = false) {
    if (isBlank(query)) return;
    if (!skipDebounce) yield timeout(DEBOUNCE_MS);

    return this.get('store').query('order', {
      q: query,
      include: 'order_line_items.line_item'
    });
  }).restartable(),

  // TODO: for later
  @alias('searchOrders.lastSuccessful.value') orders: null
});
