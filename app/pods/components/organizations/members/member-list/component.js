import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { computed } from 'ember-decorators/object';
import { PropTypes } from 'ember-prop-types';

export default Component.extend({
  propTypes: {
    memberships: PropTypes.array.isRequired
  },

  nameContains: null,

  // 0 - all, 1 - members, 2 - nonmembers
  showMembers: 0,

  columns: [
    { property: 'member.name', title: 'Name' },
    { property: 'member.email', title: 'Email', sort: false },
    { property: 'current', title: 'Current' },
    { property: 'startDate', title: 'Member Since' },
    { property: 'expiresAt', title: 'Membership Expires At' }
  ],

  @computed('memberships', 'nameContains', 'showMembers')
  filteredMemberships(model, nameContains, showMembers) {
    return model.filter(membership => {
      let containsName = true;
      let matchesMemberFilter = true;

      if (isPresent(nameContains)) {
        const name = membership.get('member.name');

        if (isPresent(name)) containsName = name.match(new RegExp(nameContains, 'i'));
      }

      if (showMembers !== 0) {
        if (showMembers === 1) {
          matchesMemberFilter = membership.get('current');
        } else {
          matchesMemberFilter = membership.get('expired');
        }
      }

      return (containsName && matchesMemberFilter);
    });
  }

});
