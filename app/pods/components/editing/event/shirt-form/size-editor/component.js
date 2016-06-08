import Ember from 'ember';
const { computed, isPresent } = Ember;

export default Ember.Component.extend({
  // set by caller
  model: null,

  // set by this component
  addingNewSize: false,
  newSizeName: '',
  newSizePrice: '',

  defaultPrice: computed('model.price', function() {
    return this.get('model.price');
  }),

  actions: {
    addNewSizeRow() {
      this.set('addingNewSize', true);
      this.set('newSizePrice', this.get('defaultPrice'));
    },

    removeSize(id) {
      this.get('model').removeSize(id);
    },

    addSize() {
      let name = this.get('newSizeName');
      let price = this.get('newSizePrice');

      if (!isPresent(price)) {
        price = this.get('defaultPrice');
      }

      this.get('model').addSize(name, price);

      this.set('newSizeName', '');
      this.set('addingNewSize', false);
    }
  }
});
