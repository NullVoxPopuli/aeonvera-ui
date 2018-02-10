import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'tbody',

  needTransportation: alias('housingRequest.needTransportation'),
  canProvideTransportation: alias('housingRequest.canProvideTransportation'),
  allergicToPets: alias('housingRequest.allergicToPets'),
  allergicToSmoke: alias('housingRequest.allergicToSmoke'),
  otherAllergies: alias('housingRequest.otherAllergies'),

  // TODO: this whole set of things could probably be replaced by i18n
  transportPlural: computed('housingRequest.transportationCapacity', function() {
    if (this.get('housingRequest.transportationCapacity') > 1) {
      return 'people';
    }

    return 'person';
  }),

  allergyText: computed('housingRequest', function() {
    const noPreference = this.get('noPreference');
    const pets = this.get('allergicToPets');
    const smoke = this.get('allergicToSmoke');
    const other = this.get('otherAllergies');
    const hasOther = isPresent(other);

    let result = 'You are allergic to ';

    if (hasOther) {
      result = result + other;
    }

    if (pets) {
      if (hasOther) {
        result = result + ', ';
        if (!smoke) {
          result = result + 'and ';
        }
      }

      result = result + 'pets';
    }

    if (smoke) {
      if (hasOther || pets) {
        result = result + ', and ';
      }

      result = result + 'smoke';
    }
  }),

  noPreference: computed('housingRequest.preferredGenderToHouseWith', function() {
    const pref = this.get('housingRequest.preferredGenderToHouseWith');

    if (typeof pref === 'string') {
      return pref.includes('No');
    }

    // why wouldn't this be a string?
    console.error(pref);
    return true;
  }),

  requested: computed('housingRequest', function() {
    const hr = this.get('housingRequest');
    let result = hr.get('requested1');
    const r2 = hr.get('requested2');
    const r3 = hr.get('requested3');
    const r4 = hr.get('requested4');

    if (r2) {
      result = result + `, ${r2}`;
    }

    if (r3) {
      result = result + `, ${r3}`;
    }

    if (r4) {
      result = result + `, ${r4}`;
    }

    return result;
  }),

  unwanted: computed('housingRequest', function() {
    const hr = this.get('housingRequest');
    let result = hr.get('unwanted1');
    const r2 = hr.get('unwanted2');
    const r3 = hr.get('unwanted3');
    const r4 = hr.get('unwanted4');

    if (r2) {
      result = result + `, ${r2}`;
    }

    if (r3) {
      result = result + `, ${r3}`;
    }

    if (r4) {
      result = result + `, ${r4}`;
    }

    return result;
  })

});
