import Ember from 'ember';

export default Ember.Controller.extend({
  columns: [
    {property: 'order.userName', title: 'Name' },
    {property: 'danceOrientation', title: 'Orientation', showOn: 'requiresOrientation'},
    {property: 'partnerName', title: 'Partner', showOn: 'requiresPartner'},
  ]
});
