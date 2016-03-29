import DS from 'ember-data';
import LineItem from '../models/line-item';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';

export default LineItem.extend(LeadsAndFollows, {
  initialPrice: DS.attr('number'),
  atTheDoorPrice: DS.attr('number'),
  kind: DS.attr('number'),

  requiresOrientation: DS.attr('boolean'),
  requiresPartner: DS.attr('boolean'),

  /**
    TODO: find out if there is a better way to represent this...
  */
  kindName: function () {
    var kind = this.get('kind');

    if (kind === 0) {
      return 'Solo Jazz';
    } else if (kind === 1) {
      return 'Jack & Jill';
    } else if (kind === 2) {
      return 'Strictly';
    } else if (kind === 3) {
      return 'Team';
    } else if (kind === 4) {
      return 'Crossover Jack & Jill';
    }
  }.property('kind'),

  // requiresPartner: function(){
  //   return this.get('kind') === 2;
  // }.property('kind'),
  //
  // requiresOrientation: function(){
  //   let kind = this.get('kind');
  //   return (kind === 1 || kind === 4)
  // }.property('kind')
});
