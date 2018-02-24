import { isBlank, isPresent } from '@ember/utils';
import DS from 'ember-data';
import Host from '../models/host';
import RegistrationOpens from '../mixins/models/registration-opens';
import { hasDateExpired } from 'aeonvera/helpers/has-expired';

const { attr, belongsTo, hasMany } = DS;

import { computed } from 'ember-decorators/object';
import { alias, gt } from 'ember-decorators/object/computed';

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
  isHousingEnabled: alias('housingStatus'),
  housingNights: attr(),

  allowDiscounts: attr('boolean'),
  registrationEmailDisclaimer: attr('string'),

  url: attr('string'),

  askIfLeadingOrFollowing: attr('boolean'),

  openingTier: belongsTo('opening-tier', { async: false }),
  currentTier: belongsTo('pricing-tier', { async: false }),
  settings: belongsTo('event-settings', { async: false }),

  packages: hasMany('package'),
  levels: hasMany('level'),
  competitions: hasMany('competitions', { inverse: 'event' }),
  lineItems: hasMany('line-item'),
  shirts: hasMany('shirts'),
  customFields: hasMany('custom-field', { inverse: 'host' }),
  sponsorships: hasMany('sponsorship'),
  registrations: hasMany('registration'),

  @alias('openingTier.increaseAfterDate') registrationOpensAt: null,

  @computed('registrationOpensAt')
  registrationIsOpen(openDate) {
    const now = new Date();

    return now > openDate;
  },

  @computed('shirtSalesEndAt')
  shirtSalesHaveEnded(expiresAt) {
    return hasDateExpired(expiresAt);
  },

  @computed('onlineCompetitionSalesEndAt')
  competitionSalesHaveEnded(endedAt) {
    return hasDateExpired(endedAt);
  },

  @computed('lineItems.@each')
  hasActiveLineItems(lineItems) {
    const notExpired = lineItems.filter(item => {
      const expiration = item.get('expiresAt');

      return isBlank(expiration) || hasDateExpired(expiration);
    });

    return isPresent(notExpired);
  },

  @gt('packages.length', 0) hasTickets: null
});
