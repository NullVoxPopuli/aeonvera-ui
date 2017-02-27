import Ember from 'ember';
import DS from 'ember-data';
import Discount from 'aeonvera/models/discount';

const {computed} = Ember;

export default Discount.extend({
  organization: DS.belongsTo('organization')
});
