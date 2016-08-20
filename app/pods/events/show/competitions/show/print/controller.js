import Ember from 'ember';

export default Ember.Controller.extend({
  additionalRows: 0,
  additionalRowArray: Ember.computed('additionalRows', {
    get() {
      let countInput = this.get('additionalRows');
      let start = this.get('model.orderLineItems.length');
      let count = parseInt(countInput);
      let result = [];

      for (let i = 0; i < count; i++) {
        result.push(start + i);
      }

      return result;
    }
  })
});
