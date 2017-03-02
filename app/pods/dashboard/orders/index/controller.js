import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Controller.extend({
  columns: [
    { property: 'createdAt', title: 'Date' },
    { property: 'hostName', title: 'Event Name' },
    { property: 'paidAmount', title: 'Amount Paid' }
  ]
});
