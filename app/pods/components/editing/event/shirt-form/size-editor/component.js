import Ember from 'ember';
const {computed, isPresent} = Ember;

export default Ember.Component.extend({
  // set by caller
  model: null,

  // set by this component
  addingNewSize: false,
  newSizeName: '',
  newSizePrice: '',
  newSizeInventory: '',

  defaultPrice: computed('model.price', function() {
    return this.get('model.price');
  }),

  actions: {
    addNewSizeRow() {
      this.set('addingNewSize', true);
      this.set('newSizePrice', this.get('defaultPrice'));
      this.set('newSizeInventory', 0);
    },

    removeSize(id) {
      this.get('model').removeSize(id);
    },

    addSize() {
      const name = this.get('newSizeName');
      let price = this.get('newSizePrice');
      const inventory = this.get('newSizeInventory');

      if (!isPresent(price)) {
        price = this.get('defaultPrice');
      }

      this.get('model').addSize(name, price, inventory);

      this.set('newSizeName', '');
      this.set('addingNewSize', false);
    },

    setDirty() {
      this.get('model').send('becomeDirty');
    }
  }
});
