import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['payment-status-badge'],
  classNameBindings: ['showPaid:paid:unpaid'],

  isBalanceZero: Ember.computed('owes', function() {
    const owes = this.get('owes');

    return (owes === 0.0);
  }),

  showPaid: Ember.computed('isBalanceZero', 'hasPaid', function() {
    const isBalanceZero = this.get('isBalanceZero');
    const hasPaid = this.get('hasPaid');

    return (hasPaid || isBalanceZero);
  })
});
