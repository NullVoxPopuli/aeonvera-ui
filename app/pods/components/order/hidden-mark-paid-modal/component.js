import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  actions: {
    afterPayment() {
      this.sendAction('afterPayment');
    }
  }
});
