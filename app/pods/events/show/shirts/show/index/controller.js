import Controller from '@ember/controller';

export default Controller.extend({
  columns: [
    { property: 'order.userName', title: 'Name' },
    { property: 'size', title: 'Size' },
    { property: 'quantity', title: 'Qty' },
    { property: 'order.paymentReceivedAt', title: 'Paid At' },
    { property: 'order.createdAt', title: 'Registered At' }
  ]
});
