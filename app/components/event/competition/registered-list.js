import Ember from 'ember';

export default Ember.Component.extend({
  model: Ember.computed.alias('competition'),
  columns: [
    {property: 'order.userName', title: 'Name'},
    {property: 'danceOrientation', title: 'Orientation', showOn: 'model.requiresOrientation'},
    {property: 'partnerName', title: 'Partner', showOn: 'model.requiresPartner'},
    {property: 'order.paymentReceivedAt', title: 'Paid At'}
  ]
});
