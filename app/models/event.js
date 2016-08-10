import Ember from 'ember';
import DS from 'ember-data';
import Host from '../models/host';
import RegistrationOpens from '../mixins/models/registration-opens';

const { attr, belongsTo, hasMany } = DS;

export default Host.extend(RegistrationOpens, {
  shortDescription:        attr('string'),
  location:                attr('string'),

  startsAt:                attr('date'),
  endsAt:                  attr('date'),

  mailPaymentsEndAt:       attr('date'),
  electronicPaymentsEndAt: attr('date'),
  refundsEndAt:            attr('date'),
  shirtSalesEndAt:         attr('date'),
  showAtTheDoorPricesAt:   attr('date'),

  showOnPublicCalendar:    attr('boolean'),
  hasVolunteers:           attr('boolean'),
  volunteerDescription:    attr('string'),

  housingStatus:    attr('boolean'),
  isHousingEnabled: Ember.computed.alias('housingStatus'),
  housingNights:    attr(),

  allowDiscounts:         attr('boolean'),
  registrationEmailDisclaimer: attr('string'),

  url: attr('string'),

  askIfLeadingOrFollowing: attr('boolean'),

  openingTier:  belongsTo('openingTier'),
  currentTier:  belongsTo('pricing-tier'),
  packages:     hasMany('package'),
  levels:       hasMany('level'),
  competitions: hasMany('competitions'),
  lineItems:    hasMany('lineItems'),
  shirts:       hasMany('shirts'),
  customFields: hasMany('custom-field'),
  sponsorships: hasMany('sponsorship'),
  eventAttendances: hasMany('event-attendance'),
  attendances: hasMany('attendance'),

  registrationOpensAt: function() {
    return this.get('openingTier.increaseAfterDate');
  }.property('openingTier.increaseAfterDate'),

  registrationIsOpen: Ember.computed('registrationOpensAt', function() {
    let openDate = this.get('registrationOpensAt');
    let now = new Date();

    return now > openDate;
  }),

  shirtSalesHaveEnded: Ember.computed('shirtSalesEndAt', {
    get() {
      let expiresAt = this.get('shirtSalesEndAt');
      return expiresAt < new Date();
    }
  })

});
