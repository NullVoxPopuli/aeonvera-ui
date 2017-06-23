import Ember from 'ember';
import DS from 'ember-data';

import PricingTier from '../models/pricing-tier';

export default PricingTier.extend({
  event: DS.belongsTo('event', { inverse: 'openingTier' })
});
