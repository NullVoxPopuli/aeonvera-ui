import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  currentPassword: DS.attr('string'),
  unconfirmedEmail: DS.attr('string'),
  timeZone: DS.attr('string'),

  membershipRenewals: DS.hasMany('membership-renewal'),

  name: Ember.computed('firstName', 'lastName', function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }).readOnly(),

  isMemberOf(organization) {
    let isMember = false;
    let membershipRenewals = this.get('membershipRenewals');

    membershipRenewals.forEach((item, index, enumerable) => {
      let related = item.get('membershipOption.host');

      if (related.get('id') === organization.get('id') &&
        related.get('domain') === organization.get('domain')
      ) {
        isMember = true;
      }
    });

    return isMember;
  },

});
