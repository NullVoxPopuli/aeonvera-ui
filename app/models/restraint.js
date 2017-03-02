import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  restrictionFor: DS.belongsTo('purchasable', { polymorphic: true, async: true }),
  restrictedTo: DS.belongsTo('purchasable', { polymorphic: true, async: true })
});
