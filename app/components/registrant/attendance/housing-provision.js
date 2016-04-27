import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tbody',
  hasPets: Ember.computed.alias('housingProvision.hasPets'),
  smokes: Ember.computed.alias('housingProvision.smokes'),
  smokingConjunction: Ember.computed('hasPets',  function() {
    return this.get('hasPets') ? 'and' : 'With';
  }),
  transportationConjuction: Ember.computed('hasPets', 'smokes', function() {
    if (this.get('hasPets') || this.get('smokes')) {
      return 'and are';
    }

    return '';
  }),

  // TODO: this whole set of things could probably be replaced by i18n
  transportPlural: Ember.computed('housingProvision.transportationCapacity', function() {
    if (this.get('housingProvision.transportationCapacity') > 1) {
      return 'people';
    }

    return 'person';
  }),

  hostingNoPreference: Ember.computed('housingProvision.preferredGenderToHost', function() {
    return this.get('housingProvision.preferredGenderToHost').includes('No');
  }),
});
