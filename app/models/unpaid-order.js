import DS from 'ember-data';
import Order from '../models/order';

const { belongsTo } = DS;

export default Order.extend({
  registration: belongsTo('registration', { async: false, inverse: 'unpaidOrder' })
});
