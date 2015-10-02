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
  // allowedPackages: DS.hasMany('package'),
  packages: DS.hasMany('package', { async: true } ),
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
    // let packages = this.get('packages');
    // let host = this.get('host');
    // let hostId = host.get('id'); //this.get('hostId');
    // let hostType = host.get('type');
    // let parentPath = Ember.String.underscore(hostType);
    // parentPath = Ember.String.pluralize(parentPath);
    //
    // let adapter = this.store.adapterFor('packages');
    //
    // let rootNamespace = adapter.namespace;
    // let eventDiscountNamespace = rootNamespace + '/' + parentPath + '/' + hostId + '/packages';
    //
    // adapter.set('namespace', eventDiscountNamespace);
    //
    // console.log(adapter.namespace);
    // console.log(this.store.adapterFor('packages').namespace);

    return this.get('packages', { event_id: 16 });
    // packages.forEach(function(pack){
    //   let name = pack.get('name');
    //
    //   nameArray.push(name);
    // });

    return nameArray.join(', ');
  }.property('allowedPackages')

});
