import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import RSVP from 'rsvp';

export default Mixin.create({

  ensureOrderExists(orderType = 'order') {
    const order = this.get('order');
    const event = this.get('event');
    const registration = this.get('registration');

    return RSVP.resolve(order).then(o => {
      if (o !== null) {
        if (o.get('hasDirtyAttributes') && !o.get('isNew')) return o.save();

        return RSVP.resolve(o);
      }

      // assert('Registration must be present', registration);
      // assert('Event must be present', event);

      const order = this.get('store').createRecord(orderType, {
        host: event,
        user: this.get('currentUser'),
        userName: registration && registration.get('name'),
        userEmail: registration && registration.get('attendeeEmail'),
        registration: registration
      });

      this.set('order', order);

      return order.save();
    });
  }
});
