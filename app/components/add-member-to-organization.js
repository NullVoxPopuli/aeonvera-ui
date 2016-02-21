import Ember from 'ember';
import EditModel from 'aeonvera/mixins/edit-model';

export default Ember.Component.extend(EditModel, {
  modelName: 'membership',
  saveSuccessPath: 'my-communities.manage.membership',
  cancelPath: 'my-communities.manage.membership',
  membershipOptions: null,

  selectedOption: function() {
    let model = this.get('model');
    return model.get('membershipOption');
  }.property('model.membershipOption'),

  actions: {
    selectOption(option) {
      let model = this.get('model');
      model.set('membershipOption', option);
    }
  }
});
