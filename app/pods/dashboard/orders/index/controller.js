import Controller from '@ember/controller';
import ENV from 'aeonvera/config/environment';

export default Controller.extend({
  columns: [
    { property: 'createdAt', title: 'Date' },
    { property: 'hostName', title: 'Event Name' },
    { property: 'paidAmount', title: 'Amount Paid' }
  ]
});
