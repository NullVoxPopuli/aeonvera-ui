import DS from 'ember-data';
import LineItem from '../models/line-item';

export default LineItem.extend({
  organization: DS.belongsTo('organization'),
});
