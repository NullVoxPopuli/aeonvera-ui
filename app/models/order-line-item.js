import Ember from 'ember';
import DS from 'ember-data';
import Discount from '../models/discount';
import Validator from '../mixins/model-validator';

export default DS.Model.extend(Validator, {
  lineItem: DS.belongsTo('purchasable', {
    async: true,
    polymorphic: true
  }),
  order: DS.belongsTo('order'),
  quantity: DS.attr('number'),
  price: DS.attr('number'),
  pickedUpAt: DS.attr('date'),

  /*
    these properties are for additional objects that need to be created on the
    server, and are not actually stored with the order-line-item
  */
  partnerName: DS.attr('string'),
  danceOrientation: DS.attr('string'),
  size: DS.attr('string'),

  /*
    This is never received from the server, but will be set upon
    an attempt to delete an order-line-item. The use case for this
    is only when deleting a previously persisted order-line-item when
    the order was created on a non-logged-in account.
  */
  paymentToken: DS.attr('string'),

  pickedUp: Ember.computed('pickedUpAt', {
    get() {
      return Ember.isPresent(this.get('pickedUpAt'));
    }
  }),

  priceNeedsChanging: function() {
    const lineItem = this.get('lineItem');
    const size = this.get('size');
    const sizeMethod = lineItem.priceForSize;

    if (Ember.isPresent(sizeMethod)) {
      const sizePrice = sizeMethod(size);

      this.set('price', sizePrice);
    }
  }.observes('size'),

  total: function() {
    const price = this.get('price');
    const quantity = this.get('quantity');
    const total = price * quantity;

    return total;
  }.property('price', 'quantity'),

  validations: {
    lineItem: { presence: true },
    order: { presence: true },
    quantity: { presence: true },
    price: { presence: true },

    partnerName: {
      custom: {
        message: 'Partner Name is required.',
        validation: function(key, value, model) {
          if (model.get('lineItem.isCompetition')) {
            if (model.get('lineItem.requiresPartner')) {
              return Ember.isPresent(model.get('partnerName'));
            }
          }

          // always return true, this is not a required field
          return true;
        }
      }
    },

    danceOrientation: {
      custom: {
        message: 'Dance Orientation is required.',
        validation: function(key, value, model) {
          if (model.get('lineItem.isCompetition')) {
            if (model.get('lineItem.requiresOrientation')) {
              return Ember.isPresent(model.get('danceOrientation'));
            }
          }

          // always return true, this is not a required field
          return true;
        }
      }
    },

    size: {
      custom: {
        message: 'Please select a shirt size.',
        validation: function(key, value, model) {
          if (model.get('lineItem.isShirt')) {
            return Ember.isPresent(model.get('size'));
          }

          // always return true, this is not a required field
          return true;
        }
      }
    }
  }
});
