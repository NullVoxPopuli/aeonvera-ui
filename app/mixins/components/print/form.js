import Ember from 'ember';

export default Ember.Mixin.create({
  additionalRows: 0,
  additionalRowsArray: Ember.computed('additionalRows', {
    get() {
      const newRows = this.get('additionalRows');
      const result = [];

      for (let i = 0; i < newRows; i++) {
        result.push(i);
      }

      return result;
    }
  })
});
