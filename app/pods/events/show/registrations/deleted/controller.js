import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

import { computed } from 'ember-decorators/object';

export default Ember.Controller.extend({
  columns: [
    { property: 'attendeeName', title: 'Name' },
    { property: 'danceOrientation', title: '' },
    { property: 'levelName', title: 'Level' },
    { property: 'paymentStatus', title: 'Payment' },
    { property: 'registeredAt', title: 'Registered At' }
  ],

  registrations: Ember.computed.alias('model.registrations')
});
