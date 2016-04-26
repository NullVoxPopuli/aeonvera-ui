import Ember from 'ember';

export default Ember.Component.extend({
  displayFee: Ember.computed('model.shouldApplyFee', 'fee', function() {
    let shouldApplyFee = this.get('model.shouldApplyFee');
    let fee = this.get('model.fee');
    let paid = this.get('model.paid');

    let result = (paid && fee > 0) || shouldApplyFee;
    return result;
  })
});
