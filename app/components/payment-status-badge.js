import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['payment-status-badge'],
  classNameBindings: ['hasPaid:paid:unpaid'],
});
