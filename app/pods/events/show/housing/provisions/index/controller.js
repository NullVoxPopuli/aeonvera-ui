import Ember from 'ember';

export default Ember.Controller.extend({
  columns: [
    { property: 'providingName', title: 'Name' },
    { property: 'housingCapacity', title: 'Capacity' },
    { property: 'numberOfShowers', title: 'Showers' },
    { property: 'attendance.hasPaid', title: 'Paid' },
    { property: '', title: 'Allergens' },
    { property: '', title: 'Can Transport', sort: false },
    { property: '', title: 'Notes', sort: false },
    { property: 'attendance.registeredAt', title: 'Registered At' }
  ],
});
