import Ember from 'ember';
import EditModel from 'aeonvera/mixins/edit-model';

export default Ember.Component.extend(EditModel, {
  modelName: 'membership',
  saveSuccessPath: 'my-communities.manage.membership',
  cancelPath: 'my-communities.manage.membership',

  membershipOptions: function() {
    let organization = this.get('organization');
    return organization.get('membershipOptions');
  }.property()
});
