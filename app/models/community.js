import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  tagline: DS.attr('string'),

  city: DS.attr('string'),
  state: DS.attr('string'),

  beta: DS.attr('boolean'),
  make_attendees_pay_fees: DS.attr('boolean'),

  logo_file_name: DS.attr('string'),
  logo_file_size: DS.attr('number'),
  logo_updated_at: DS.attr('date'),
  logo_url: DS.attr('string'),
  logo_url_thumb: DS.attr('string'),
  logo_url_medium: DS.attr('string'),

  url: DS.attr('string'),

  owner: DS.belongsTo('user'),

  location: function() {
    return this.get('city') + ", " + this.get('state');
  }.property('city', 'state'),

  logo_is_missing: function() {
    return (this.get('logo_url').indexOf("missing") !== -1);
  }.property('logo_url')
});
