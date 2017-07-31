import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tbody',

  needTransportation: Ember.computed.alias('housingRequest.needTransportation'),
  canProvideTransportation: Ember.computed.alias('housingRequest.canProvideTransportation'),
  allergicToPets: Ember.computed.alias('housingRequest.allergicToPets'),
  allergicToSmoke: Ember.computed.alias('housingRequest.allergicToSmoke'),
  otherAllergies: Ember.computed.alias('housingRequest.otherAllergies'),

  // TODO: this whole set of things could probably be replaced by i18n
  transportPlural: Ember.computed('housingRequest.transportationCapacity', function() {
    if (this.get('housingRequest.transportationCapacity') > 1) {
      return 'people';
    }

    return 'person';
  }),

  allergyText: Ember.computed('housingRequest', function() {
    const noPreference = this.get('noPreference');
    const pets = this.get('allergicToPets');
    const smoke = this.get('allergicToSmoke');
    const other = this.get('otherAllergies');
    const hasOther = Ember.isPresent(other);

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

  noPreference: Ember.computed('housingRequest.preferredGenderToHouseWith', function() {
    const pref = this.get('housingRequest.preferredGenderToHouseWith');

    if (typeof pref === 'string') {
      return pref.includes('No');
    }

    // why wouldn't this be a string?
    console.error(pref);
    return true;
  }),

  requested: Ember.computed('housingRequest', function() {
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

  unwanted: Ember.computed('housingRequest', function() {
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
