import Ember from 'ember';

export default Ember.Controller.extend({
  columns: [
    {propertyName: 'order.userName', title: 'Name', disableFiltering: true},
    {propertyName: 'danceOrientation', title: 'Orientation', disableFiltering: true, isHidden: 'model.requiresOrientation'},
    {propertyName: 'partnerName', title: 'Partner', disableFiltering: true, isHidden: 'model.requiresPartner'},
  ]
});
