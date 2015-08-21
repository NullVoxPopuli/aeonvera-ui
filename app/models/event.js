import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	shortDescription: DS.attr('string'),
	location: DS.attr('string'),

	startsAt: DS.attr('date'),
	endsAt: DS.attr('date'),

	mailPaymentsEndAt: DS.attr('date'),
	electronicPaymentsEndAt: DS.attr('date'),
	refundsEndAt: DS.attr('date'),
	shirtSalesEndAt: DS.attr('date'),
	showAtTheDorPricesAt: DS.attr('date'),

	showOnPublicCalendar: DS.attr('boolean'),
	acceptOnlyElectronicPayments: DS.attr('boolean'),
	makeAttendeesPayFees: DS.attr('boolean'),
	hasVolunteers: DS.attr('boolean'),
	volunteerDescription: DS.attr('string'),

	housingStatus: DS.attr('boolean'),
	housingNights: DS.attr(),

	allowDiscounts: DS.attr('boolean'),
	allowCombinedDiscounts: DS.attr('boolean'),

	registrationEmailDisclaimer: DS.attr('string'),

	logo_url: DS.attr('string'),
	logo_url_medium: DS.attr('string'),
	logo_url_thumb: DS.attr('string'),

	url: DS.attr('string'),


	packages: DS.hasMany('package'),
	levels: DS.hasMany('level'),
	competitions: DS.hasMany('competitions')
});
