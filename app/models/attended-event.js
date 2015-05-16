import DS from 'ember-data';

export default DS.Model.extend({
	name: attr(),
	registered_at: attr('date'),
	owed: attr(),
	paid: attr(),
	event_begins: attr('date'),
	registration_status: attr()

});
