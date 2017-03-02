import Ember from 'ember';
const { computed, isPresent } = Ember;

export default Ember.Component.extend({
  event: null, // set by caller
  organizations: [], // set by caller
  discounts: [], // set by caller
  model: computed.alias('event'),
  currentSponsorships: computed.alias('event.sponsorships'),

  isAdding: false,
  selectedOrganization: null,
  selectedDiscount: null,
  saveDisabled: computed('selectedOrganization', 'selectedDiscount', function() {
    const org = this.get('selectedOrganization');
    const discount = this.get('selectedDiscount');

    return !(isPresent(org) && isPresent(discount));
  }),

  actions: {
    setIntentToAdd() {
      this.set('isAdding', true);
    },

    saveSponsorship() {
      const event = this.get('event');
      const org = this.get('selectedOrganization');
      const discount = this.get('selectedDiscount');

      const sponsorship = this.get('store').createRecord('sponsorship', {
        discount: discount,
        sponsor: org,
        sponsored: event
      });

      sponsorship.save().then(record => {

      }, error => {
        this.get('flashMessages').alert(error);
      });

      this.set('selectedOrganization', null);
      this.set('selectedDiscount', null);
    },

    deleteSponsorship(sponsorship) {
      sponsorship.destroyRecord();
    }
  }
});
