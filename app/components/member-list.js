import Ember from 'ember';

export default Ember.Component.extend({
  nameContains: null,

  // 0 - all, 1 - members, 2 - nonmembers
  showMembers: 0,

  sortedMemberships: Ember.computed.sort('memberships', 'sortProps'),
  sortProps: ['expiresAt:desc'],

  memberships: function () {
    let model = this.get('model');
    let nameContains = this.get('nameContains');
    let showMembers = this.get('showMembers');

    return model.filter(function (membership) {
      var containsName = true;
      var matchesMemberFilter = true;

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
  }.property('model', 'nameContains', 'showMembers'),

  nameSort: function () {
    return this._sortIndicator('member.name');
  }.property('sortProps'),

  currentSort: function () {
    return this._sortIndicator('current');
  }.property('sortProps'),

  startDateSort: function () {
    return this._sortIndicator('startDate');
  }.property('sortProps'),

  expiresAtSort: function () {
    return this._sortIndicator('expiresAt');
  }.property('sortProps'),

  _sortIndicator: function (field) {
    let currentSort = this.get('sortProps')[0];
    let sort = currentSort.split(':');
    let sortProperty = sort[0];
    let sortDirection = sort[1];

    if (sortProperty === field) {
      return (sortDirection === 'desc') ? '▼' : '▲';
    }

    return '';
  },

  actions: {
    toggleSort: function (property) {
      let currentSort = this.get('sortProps')[0];
      let sort = currentSort.split(':');
      let sortProperty = sort[0];
      let sortDirection = sort[1];

      if (property === sortProperty) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        this.set('sortProps', [property + ':' + sortDirection]);
      } else {
        this.set('sortProps', [property + ':asc']);
      }
    },
  },

});
