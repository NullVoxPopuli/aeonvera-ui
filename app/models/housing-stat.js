import DS from 'ember-data';

export default DS.Model.extend({
  requests: DS.attr('number'),
  provisions: DS.attr('number'),

  housingRequests: DS.hasMany('housing-request'),
  housingProvisions: DS.hasMany('housing-provision'),

  neededSpots: function () {
    let requests = this.get('requests');
    let provisions = this.get('provisions');
    return (requests - provisions);
  }.property('requests', 'provisions'),
});
