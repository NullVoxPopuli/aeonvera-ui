import Controller from '@ember/controller';

export default Controller.extend({
  columns: [
    { property: 'attendeeName', title: 'Name' },
    { property: 'danceOrientation', title: 'Orientation' },
    { property: 'registeredAt', title: 'Registered At', sort: false }
  ]
});
