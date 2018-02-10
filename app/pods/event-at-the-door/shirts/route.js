import Route from '@ember/routing/route';

export default Route.extend({
  model(params, transition) {
    const event = this.modelFor('event-at-the-door');
    const itemsPromise = this.store.query('orderLineItem', {
      event_id: event.get('id'),
      q: {
        line_item_type_eq: 'LineItem::Shirt'
      },
      include: 'order,line_item'
    });

    return {
      event: event,
      items: itemsPromise
    };
  }
});
