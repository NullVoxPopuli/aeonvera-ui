import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	registeredAt: DS.attr('date'),
	amountOwed: DS.attr('number'),
	amountPaid: DS.attr('number'),
	eventBeginsAt: DS.attr('date'),
	isAttending: DS.attr('boolean'),

	registrationStatus: function(){
		if (this.get("isAttending")){
			return "Attending";
		} else {
			return "Not Attending";
		}
	}.property('isAttending')

});
