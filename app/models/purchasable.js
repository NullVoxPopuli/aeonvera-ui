import DS from 'ember-data';
import Comparison from 'aeonvera/mixins/models/comparison';
export default DS.Model.extend(Comparison, {
  restraints: DS.hasMany('restraint', { async: false })
});
