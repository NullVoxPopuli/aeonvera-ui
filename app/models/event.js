import Ember from 'ember';
import DS from 'ember-data';
import Host from '../models/host';
import RegistrationOpens from '../mixins/models/registration-opens';
import { hasDateExpired } from 'aeonvera/helpers/has-expired';

const { attr, belongsTo, hasMany } = DS;

export default Host.extend(RegistrationOpens, {
  shortDescription: attr('string'),
  location: attr('string'),

  startsAt: attr('date'),
  endsAt: attr('date'),

  mailPaymentsEndAt: attr('date'),
  electronicPaymentsEndAt: attr('date'),
  refundsEndAt: attr('date'),
  shirtSalesEndAt: attr('date'),
  showAtTheDoorPricesAt: attr('date'),
  onlineCompetitionSalesEndAt: attr('date'),

  showOnPublicCalendar: attr('boolean'),
  hasVolunteers: attr('boolean'),
  volunteerDescription: attr('string'),

  housingStatus: attr('boolean'),
  isHousingEnabled: Ember.computed.alias('housingStatus'),
  housingNights: attr(),

  allowDiscounts: attr('boolean'),
  registrationEmailDisclaimer: attr('string'),

  url: attr('string'),

  askIfLeadingOrFollowing: attr('boolean'),

  openingTier: belongsTo('opening-tier', { async: false }),
  currentTier: belongsTo('pricing-tier', { async: false }),
  packages: hasMany('package'),
  levels: hasMany('level'),
  competitions: hasMany('competitions', { inverse: 'event' }),
  lineItems: hasMany('line-item'),
  shirts: hasMany('shirts'),
  customFields: hasMany('custom-field', { inverse: 'host' }),
  sponsorships: hasMany('sponsorship'),
  eventAttendances: hasMany('registration'),
  registrations: hasMany('registration'),

  registrationOpensAt: function() {
    return this.get('openingTier.increaseAfterDate');
  }.property('openingTier.increaseAfterDate'),

  registrationIsOpen: Ember.computed('registrationOpensAt', function() {
    const openDate = this.get('registrationOpensAt');
    const now = new Date();

    return now > openDate;
  }),

  shirtSalesHaveEnded: Ember.computed('shirtSalesEndAt', {
    get() {
      const expiresAt = this.get('shirtSalesEndAt');

      return hasDateExpired(expiresAt);
    }
  }),

  competitionSalesHaveEnded: Ember.computed('onlineCompetitionSalesEndAt', {
    get() {
      const endedAt = this.get('onlineCompetitionSalesEndAt');

      return hasDateExpired(endedAt);
    }
  }),

  hasActiveLineItems: Ember.computed('lineItems.@each', {
    get() {
      const lineItems = this.get('lineItems');
      const notExpired = lineItems.filter(item => hasDateExpired(item.get('expiresAt')));

      return Ember.isPresent(notExpired);
    }
  })

});
