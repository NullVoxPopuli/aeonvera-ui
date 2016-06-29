import Ember from 'ember';

export default Ember.Controller.extend({
  columns: [
    { property: 'attendance.attendeeName', title: 'Name' },
    { property: 'attendance.hasPaid', title: 'Paid' },
    { property: '', title: 'Allergies' },
    { property: '', title: 'Requested', sort: false },
    { property: '', title: 'Unwanted', sort: false },
    { property: '', title: 'Can Transport', sort: false },
    { property: '', title: 'Notes', sort: false },
    { property: 'attendance.registeredAt', title: 'Registered At' }
  ],
});
