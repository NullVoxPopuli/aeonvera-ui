import Ember from 'ember';

export default Ember.Component.extend({
  nameContains: null,

  // 0 - all, 1 - members, 2 - nonmembers
  showMembers: 0,

  columns: [
    {property: 'member.name', title: 'Name'},
    {property: 'member.email', title: 'Email', sort: false},
    {property: 'current', title: 'Current'},
    {property: 'startDate', title: 'Member Since'},
    {property: 'expiresAt', title: 'Membership Expires At'}
  ],

  memberships: Ember.computed('model', 'nameContains', 'showMembers', function() {
    const model = this.get('model');
    const nameContains = this.get('nameContains');
    const showMembers = this.get('showMembers');

    return model.filter(function(membership) {
      let containsName = true;
      let matchesMemberFilter = true;

      if (Ember.isPresent(nameContains)) {
        containsName = membership.get('member.name').match(
          new RegExp(nameContains, 'i'));
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
  })

});
