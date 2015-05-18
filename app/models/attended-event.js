import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	registeredAt: DS.attr('date'),
	owed: DS.attr('decimal'),
	paid: DS.attr('decimal'),
	eventBeginsAt: DS.attr('date'),
	registrationStatus: DS.attr('status')

});
