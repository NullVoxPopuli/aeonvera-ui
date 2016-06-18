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
    let org = this.get('selectedOrganization');
    let discount = this.get('selectedDiscount');

    return !(isPresent(org) && isPresent(discount));
  }),

  actions: {
    setIntentToAdd() {
      this.set('isAdding', true);
    },

    saveSponsorship() {
      let event = this.get('event');
      let org = this.get('selectedOrganization');
      let discount = this.get('selectedDiscount');

      let sponsorship = this.get('store').createRecord('sponsorship', {
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
