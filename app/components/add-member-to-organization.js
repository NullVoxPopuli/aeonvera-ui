import Ember from 'ember';
import EditModel from 'aeonvera/mixins/edit-model';

export default Ember.Component.extend(EditModel, {
  modelName: 'membership',
  saveSuccessPath: 'my-communities.manage.membership',
  cancelPath: 'my-communities.manage.membership',
  membershipOptions: null,

  selectedOption: function() {
    const model = this.get('model');

    return model.get('membershipOption');
  }.property('model.membershipOption'),

  memberList: function() {
    const members = this.store.query('member', {all: true});

    return members;
  }.property(),

  actions: {
    selectOption(option) {
      const model = this.get('model');

      model.set('membershipOption', option);
    }
  }
});
