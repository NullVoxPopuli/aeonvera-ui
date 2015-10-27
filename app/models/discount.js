import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({

  DOLLARS_OFF: 0,
  PERCENT_OFF: 1,

  code: DS.attr('string'),
  amount: DS.attr('string'),
  kind: DS.attr('number'),
  timesUsed: DS.attr('number'),

  discountType: DS.attr('string'),
  appliesTo: DS.attr('string'),
  allowedNumberOfUses: DS.attr('number'),

  host: DS.belongsTo('host', { polymorphic: true, async: true }),
  allowedPackages: DS.hasMany('package', { async: true }),
  // restraints: DS.hasMany('restraint')

  discount: function(){
    let kind = this.get('kind');
    let amount = this.get('amount');

    if (kind === this.get('DOLLARS_OFF')){
      return '$' + amount;
    }

    return amount + '%';
  }.property('amount', 'kind'),

  restrictedTo: function(){
    let nameArray = [];

    return this.get('packages', { event_id: 16 }).then(function(pack){
      let name = pack.get('name');

      nameArray.push(name);
    });

    return nameArray.join(', ');
  }.property('packages')

});
