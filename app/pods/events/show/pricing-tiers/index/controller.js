import Ember from 'ember';

export default Ember.Controller.extend({
  leadsArray: Ember.computed.mapBy('model', 'numberOfLeads'),
  followsArray: Ember.computed.mapBy('model', 'numberOfFollows'),
  totalsArray: Ember.computed.mapBy('model', 'totalRegistrants'),
  totalLeads: Ember.computed.sum('leadsArray'),
  totalFollows: Ember.computed.sum('followsArray'),
  totalRegistrations: Ember.computed.sum('totalsArray'),

  sortProperties: ['isOpeningTier:desc', 'registrantsAlias:asc',
    'increaseAfterDate:asc'
  ],
  sortedTiers: Ember.computed.sort('model', 'sortProperties')

});
