import Controller from '@ember/controller';

export default Controller.extend({
  columns: [
    { property: 'writer.attendeeName', title: 'Name' },
    { property: 'value', title: 'Value' },
    { property: 'writer.danceOrientation', title: 'Orientation' },
    { property: 'writer.packageName', title: 'Package' },
    { property: 'writer.registeredAt', title: 'Registered At' }
  ]
});
