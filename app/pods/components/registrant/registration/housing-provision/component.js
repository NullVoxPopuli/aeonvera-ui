import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'tbody',
  hasPets: alias('housingProvision.hasPets'),
  smokes: alias('housingProvision.smokes'),
  smokingConjunction: computed('hasPets', function() {
    return this.get('hasPets') ? 'and' : 'With';
  }),
  transportationConjuction: computed('hasPets', 'smokes', function() {
    if (this.get('hasPets') || this.get('smokes')) {
      return 'and are';
    }

    return '';
  }),

  // TODO: this whole set of things could probably be replaced by i18n
  transportPlural: computed('housingProvision.transportationCapacity', function() {
    if (this.get('housingProvision.transportationCapacity') > 1) {
      return 'people';
    }

    return 'person';
  }),

  hostingNoPreference: computed('housingProvision.preferredGenderToHost', function() {
    return this.get('housingProvision.preferredGenderToHost').includes('No');
  })
});
