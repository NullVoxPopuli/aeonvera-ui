import Ember from 'ember';
import DS from 'ember-data';
import LineItem from '../models/line-item';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';

const { computed } = Ember;

export default LineItem.extend(LeadsAndFollows, {
  initialPrice: DS.attr('number'),
  atTheDoorPrice: DS.attr('number'),
  kind: DS.attr('number'),

  requiresOrientation: DS.attr('boolean'),
  requiresPartner: DS.attr('boolean'),

  attendances: DS.hasMany('attendance'),
  orderLineItems: DS.hasMany('order-line-item'),

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

  isSoloJazz: computed('kind', {
    get() { return this.get('kind') === 0; }
  }),

  isJackAndJill: computed('kind', {
    get() { return this.get('kind') === 1; }
  }),

  isStrictly: computed('kind', {
    get() { return this.get('kind') === 2; }
  }),

  isTeam: computed('kind', {
    get() { return this.get('kind') === 3; }
  }),

  isCrossover: computed('kind', {
    get() { return this.get('kind') === 4; }
  })
});
