import Ember from 'ember';

export default Ember.Controller.extend({
  columns: [
    {property: 'attendeeName', title: 'Name'},
    {property: 'danceOrientation', title: 'Orientation'},
    {property: 'packageName', title: 'Package'},
    {property: 'registeredAt', title: 'Registered At'}
  ]
});
