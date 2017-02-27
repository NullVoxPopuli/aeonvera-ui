import DS from 'ember-data';

export default DS.Model.extend({
  requests: DS.attr('number'),
  provisions: DS.attr('number'),
  assigned: DS.attr('number'),
  remaining: DS.attr('number'),

  housingRequests: DS.hasMany('housing-request'),
  housingProvisions: DS.hasMany('housing-provision'),

  neededSpots: function() {
    const requests = this.get('requests');
    const provisions = this.get('provisions');

    return (requests - provisions);
  }.property('requests', 'provisions')
});
