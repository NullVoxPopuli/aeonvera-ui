import { mapBy, sum, sort } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  leadsArray: mapBy('model', 'numberOfLeads'),
  followsArray: mapBy('model', 'numberOfFollows'),
  totalsArray: mapBy('model', 'totalRegistrants'),
  totalLeads: sum('leadsArray'),
  totalFollows: sum('followsArray'),
  totalRegistrations: sum('totalsArray'),

  sortProperties: ['isOpeningTier:desc', 'registrantsAlias:asc',
    'increaseAfterDate:asc'
  ],
  sortedTiers: sort('model', 'sortProperties')

});
