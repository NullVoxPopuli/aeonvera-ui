import Controller from '@ember/controller';

export default Controller.extend({
  columns: [
    { property: 'attendeeName', title: 'Name' },
    { property: 'danceOrientation', title: 'Orientation' },
    { property: 'packageName', title: 'Package' },
    { property: 'registeredAt', title: 'Registered At' }
  ]
});
