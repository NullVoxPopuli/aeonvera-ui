import Ember from 'ember';
import DS from 'ember-data';
import { alias } from 'ember-computed-decorators';

import IsLineItem from '../mixins/models/is-line-item';
import DeletedAt from '../mixins/models/deleted-at';
import Purchasable from 'aeonvera/models/purchasable';

export default Purchasable.extend(IsLineItem, DeletedAt, {

  DOLLARS_OFF: 0,
  PERCENT_OFF: 1,

  code: DS.attr('string'),
  amount: DS.attr('string'),
  kind: DS.attr('number'),
  timesUsed: DS.attr('number'),
  requiresStudentId: DS.attr('boolean'),

  discountType: DS.attr('string'),
  appliesTo: DS.attr('string'),
  allowedNumberOfUses: DS.attr('number'),

  host: DS.belongsTo('host', {
    polymorphic: true,
    async: true
  }),
  allowedPackages: DS.hasMany('package', {
    async: true
  }),

  orderLineItems: DS.hasMany('order-line-item'),
  restraints: DS.hasMany('restraint', { inverse: 'restrictionFor' }),


  @alias('code') name: null,
  // name: DS.attr('string'),

  // name: Ember.computed.alias('code'),

  price: function() {
    return this.get('discount');
  }.property('discount'),

  discount: function() {
    const kind = this.get('kind');
    const amount = this.get('amount');

    if (kind === this.get('DOLLARS_OFF')) {
      return '$' + amount;
    }

    return amount + '%';
  }.property('amount', 'kind'),

  isDollarsOff: function() {
    const kind = this.get('kind');

    return kind === this.get('DOLLARS_OFF');
  }.property('kind'),

  restrictedTo: function() {
    const nameArray = [];

    // return this.get('packages', {
    //   event_id: 16
    // }).then(function(pack) {
    //   let name = pack.get('name');
    //
    //   nameArray.push(name);
    // });
    //
    // return nameArray.join(', ');
  }.property('packages'),

  applyToAmount(value, quantity = 1) {
    const dollarsOff = this.get('isDollarsOff');
    const amount = this.get('amount');
    let subTotal = 0;

    if (dollarsOff) {
      subTotal = value - amount;
    } else {
      subTotal = value * (amount / 100.0);
    }

    subTotal = subTotal > 0 ? subTotal : 0;
    return subTotal * quantity;
  }
});
