import DS from 'ember-data';
import Host from '../models/host';
import RegistrationOpens from '../mixins/models/registration-opens';

export default Host.extend(RegistrationOpens, {
  shortDescription: DS.attr('string'),
  location: DS.attr('string'),

  startsAt: DS.attr('date'),
  endsAt: DS.attr('date'),

  mailPaymentsEndAt: DS.attr('date'),
  electronicPaymentsEndAt: DS.attr('date'),
  refundsEndAt: DS.attr('date'),
  shirtSalesEndAt: DS.attr('date'),
  showAtTheDoorPricesAt: DS.attr('date'),

  showOnPublicCalendar: DS.attr('boolean'),
  acceptOnlyElectronicPayments: DS.attr('boolean'),
  hasVolunteers: DS.attr('boolean'),
  volunteerDescription: DS.attr('string'),

  housingStatus: DS.attr('boolean'),
  housingNights: DS.attr(),

  allowDiscounts: DS.attr('boolean'),
  allowCombinedDiscounts: DS.attr('boolean'),

  registrationEmailDisclaimer: DS.attr('string'),

  logoUrl: DS.attr('string'),
  logoUrl_medium: DS.attr('string'),
  logoUrl_thumb: DS.attr('string'),

  url: DS.attr('string'),

  askIfLeadingOrFollowing: DS.attr('boolean'),

  packages: DS.hasMany('package'),
  levels: DS.hasMany('level'),
  competitions: DS.hasMany('competitions'),
  openingTier: DS.belongsTo('openingTier'),
  lineItems: DS.hasMany('lineItems'),
  shirts: DS.hasMany('shirts'),

  registrationOpensAt: function() {
    return this.get('openingTier.date');
  }.property('openingTier.date'),
});
