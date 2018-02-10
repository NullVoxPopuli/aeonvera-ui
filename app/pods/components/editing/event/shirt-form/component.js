import { computed, set } from '@ember/object';
import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import Form from 'aeonvera/mixins/components/edit-form';

export default Component.extend(Form, {
  modelName: 'shirt',
  saveSuccessPath: 'events.show.shirts.show',
  cancelPath: 'events.show.shirts',
  parentAssociation: 'host',

  showSetAllToPriceButton: computed('model.sizes', 'model.price', function() {
    const sizes = this.get('model.sizes');
    const price = this.get('model.price');

    return (isPresent(sizes) && isPresent(price));
  }),

  actions: {
    setAllSizesToPrice() {
      const currentPrice = this.get('model.price');
      const sizes = this.get('model.sizes');

      sizes.forEach(function(sizeData) {
        set(sizeData, 'price', currentPrice);
      });
    }
  }
});
