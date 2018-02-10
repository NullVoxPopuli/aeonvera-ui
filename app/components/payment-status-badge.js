import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['payment-status-badge'],
  classNameBindings: ['showPaid:paid:unpaid'],

  isBalanceZero: computed('owes', function() {
    const owes = this.get('owes');

    return (owes === 0.0);
  }),

  showPaid: computed('isBalanceZero', 'hasPaid', function() {
    const isBalanceZero = this.get('isBalanceZero');
    const hasPaid = this.get('hasPaid');

    return (hasPaid || isBalanceZero);
  })
});
