import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  event: null, // set by caller
  organizations: [], // set by caller
  model: computed.alias('event'),
  currentSponsorships: computed.alias('event.sponsorships'),

  isAdding: false,
  selectedOrganization: null,
  enteredDiscountAmount: 0,

  actions: {
    setIntentToAdd() {
      this.set('isAdding', true);
    },

    saveSponsorship() {
      let event = this.get('event');
      let org = this.get('selectedOrganization');
      let discount = this.get('enteredDiscountAmount');

      let sponsorship = this.get('store').createRecord('sponsorship', {
        discountAmount: discount,
        sponsor: org,
        sponsored: event
      });

      sponsorship.save().then(record => {

      }, error => {
        this.get('flashMessages').alert(error);
      });

      this.set('selectedOrganization', null);
      this.set('enteredDiscountAmount', 0);
    },

    deleteSponsorship(sponsorship) {
      sponsorship.destroyRecord();
    }
  }
});
