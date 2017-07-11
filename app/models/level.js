import Ember from 'ember';
import DS from 'ember-data';
import LeadsAndFollows from '../mixins/models/has-leads-and-follows';
import DeletedAt from '../mixins/models/deleted-at';

export default DS.Model.extend(LeadsAndFollows, DeletedAt, {
  name: DS.attr('string'),
  description: DS.attr('string'),
  requirement: DS.attr('number'),

  event: DS.belongsTo('event'),

  attendances: DS.hasMany('event-attendance', {
    async: true
  }),

  hasRequirement: Ember.computed('requirement', function() {
    const requirement = this.get('requirement');

    return (requirement !== 0 && requirement !== null);
  }),

  requiresName: Ember.computed('hasRequirement', function() {
    const hasRequirement = this.get('hasRequirement');
    const requirement = this.get('requirement');

    if (hasRequirement) {
      return (requirement === 1) ? 'Audition' : 'Invitation';
    }

    return '';
  }),

  requirementName: Ember.computed('requirement', function() {
    const requirement = this.get('requirement');

    if (requirement === 0) {
      return 'No Restriction';
    }

    if (requirement === 1) {
      return 'Audition';
    }

    if (requirement === 2) {
      return 'Be Invited';
    }

    return '';
  })
});
