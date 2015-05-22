import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	beginsAt: DS.attr('date'),
	endsAt: DS.attr('date'),

	packages: DS.hasMany('package'),
	levels: DS.hasMany('level'),
	competitions: DS.hasMany('competitions')
});
