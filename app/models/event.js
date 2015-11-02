import DS from 'ember-data';
import Host from '../models/host';


export default Host.extend({
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

	integrations: DS.hasMany('integration'),

	packages: DS.hasMany('package'),
	levels: DS.hasMany('level'),
	competitions: DS.hasMany('competitions'),

	stripePublishableKey: function(){
		/*
			TODO: find a way to make the 'stripe' key not a string somehow
			so typing it over and over doesn't lead to silent errors
		*/
		var integrations = this.get('integrations').filterBy('name', "stripe");
		var stripeIntegration = null;

		if (integrations.length > 0){
			stripeIntegration = integrations[0];
		}

		return stripeIntegration.get('publishableKey');

	}.property('integrations.[]')
});
