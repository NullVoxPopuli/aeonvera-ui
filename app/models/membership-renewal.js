import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  startDate: DS.attr('date'),
  expiresAt: DS.attr('date'),
  duration: DS.attr('string'),
  expired: DS.attr('boolean'),

  membershipOption: DS.belongsTo('membership-option', {
    async: false
  }),
  member: DS.belongsTo('member'),

  current: computed('expired', function() {
    const expired = this.get('expired');

    return !expired;
  }).readOnly()
});
