import DS from 'ember-data';

export default DS.Model.extend({
  hostName: DS.attr('string'),
  hostUrl: DS.attr('string'),
  createdAt: DS.attr('date'),
  paidAmount: DS.attr('number'),
  netAmountReceived: DS.attr('number'),
  totalFeeAmount: DS.attr('number'),

  totalInCents: DS.attr('number'),

  userEmail: DS.attr('string'),

  host: DS.belongsTo('host', { polymorphic: true} )

});
