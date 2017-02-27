import Ember from 'ember';
import Form from 'aeonvera/mixins/components/edit-form';

const {isPresent} = Ember;

export default Ember.Component.extend(Form, {
  modelName: 'shirt',
  saveSuccessPath: 'events.show.shirts.show',
  cancelPath: 'events.show.shirts',
  parentAssociation: 'host',

  showSetAllToPriceButton: Ember.computed('model.sizes', 'model.price', function() {
    const sizes = this.get('model.sizes');
    const price = this.get('model.price');

    return (isPresent(sizes) && isPresent(price));
  }),

  actions: {
    setAllSizesToPrice() {
      const currentPrice = this.get('model.price');
      const sizes = this.get('model.sizes');

      sizes.forEach(function(sizeData) {
        Ember.set(sizeData, 'price', currentPrice);
      });
    }
  }
});
