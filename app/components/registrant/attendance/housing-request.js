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
    let noPreference = this.get('noPreference');
    let pets = this.get('allergicToPets');
    let smoke = this.get('allergicToSmoke');
    let other = this.get('otherAllergies');
    let hasOther = Ember.isPresent(other);

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
    return this.get('housingRequest.preferredGenderToHouseWith').includes('No');
  }),

  requested: Ember.computed('housingRequest', function() {
    let hr = this.get('housingRequest');
    let result = hr.get('requested1');
    let r2 = hr.get('requested2');
    let r3 = hr.get('requested3');
    let r4 = hr.get('requested4');

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
    let hr = this.get('housingRequest');
    let result = hr.get('unwanted1');
    let r2 = hr.get('unwanted2');
    let r3 = hr.get('unwanted3');
    let r4 = hr.get('unwanted4');

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
