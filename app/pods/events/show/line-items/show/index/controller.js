import Ember from 'ember';

export default Ember.Controller.extend({
  columns: [
    { property: 'order.userName', title: 'Name' },
    { property: 'order.paymentReceivedAt', title: 'Paid At' },
    { property: 'order.createdAt', title: 'Registered At' }
  ]
});
