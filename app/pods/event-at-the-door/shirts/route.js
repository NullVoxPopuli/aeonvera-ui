import Ember from 'ember';

export default Ember.Route.extend({
  model(params, transition) {
    let event = this.modelFor('event-at-the-door');
    let itemsPromise = this.store.query('orderLineItem', {
      event_id: event.get('id'),
      q: {
        line_item_type_eq: 'LineItem::Shirt'
      },
      include: 'order'
    });

    return {
      event: event,
      items: itemsPromise
    };
  }
});