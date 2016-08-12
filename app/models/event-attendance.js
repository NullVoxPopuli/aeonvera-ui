import Ember from 'ember';
import DS from 'ember-data';
import Attendance from '../models/attendance';

export default Attendance.extend({
  packageId: DS.attr('number'),
  level: DS.belongsTo('level'),
  package: DS.belongsTo('package'),

  hasUsedStudentDiscount: Ember.computed('orders.@each', {
    get() {
      let result = false
      this.get('orders').forEach(order => {
        order.get('orderLineItems').forEach(orderLineItem => {
          let requiresStudentId = orderLineItem.get('lineItem.requiresStudentId');
          if (requiresStudentId) {
            result = true;
          }
        });
      });

      return result;
    }
  }),

  validations: {
    city: { presence: true },
    state: { presence: true },
    danceOrientation: { presence: true },
    phoneNumber: {
      custom: {
        message: 'Phone Number is required when volunteering.',
        validation(key, value, model) {
          if (model.get('interestedInVolunteering')) {
            return Ember.isPresent(value);
          }

          return true;
        }
      }
    },
    package: { presence: true },
    level: {
      custom: {
        message: 'Level is required for the selected ticket.',

        // value may be a promise here
        // so we need to see if we can access the
        // id property on it
        validation(key, value, model) {
          let requiresLevel = model.get('package.requiresTrack');
          if (requiresLevel) {
            // value is undefined for some reason
            return Ember.isPresent(model.get('level.id'));
          }

          return true;
        }
      }
    },
  }
});
