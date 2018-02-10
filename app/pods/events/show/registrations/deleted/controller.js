import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import ENV from 'aeonvera/config/environment';

import { computed } from 'ember-decorators/object';

export default Controller.extend({
  columns: [
    { property: 'attendeeName', title: 'Name' },
    { property: 'danceOrientation', title: '' },
    { property: 'levelName', title: 'Level' },
    { property: 'paymentStatus', title: 'Payment' },
    { property: 'registeredAt', title: 'Registered At' }
  ],

  registrations: alias('model.registrations')
});
