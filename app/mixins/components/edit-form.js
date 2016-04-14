import Ember from 'ember';
import EditModel from 'aeonvera/mixins/edit-model';

export default Ember.Mixin.create(EditModel, {
  parentModelId: function () {

    let passedParent = this.get('parent');
    if (!Ember.isPresent(passedParent)) {
      console.log('parent not passed in, moving on...');
    } else {
      return passedParent.get('id');
    }

    let association = this.get('parentAssociation');

    if (!Ember.isPresent(association)) {
      console.log('association not found');
    }

    let parent = this.get('model').get(association);

    if (!Ember.isPresent(parent)) {
      console.log('parent not found');
    }

    if (Ember.isPresent(parent)) {
      return parent.get('id');
    }

    return '';
  }.property('model'),

  actions: {
    save: function () {
      let model = this.get('model');

      model.save().then(record => {
        this.get('flashMessages').success(
          'Saved Successfully'
        );
        let path = this.get('saveSuccessPath');
        let parentId = this.get('parentModelId');
        let recordId = record.get('id');
        debugger;
        this.get('router').transitionTo(path, parentId, recordId);
      }, failure => {
        this.get('flashMessages').alert(
          'Saving failed. ' + failure
        );
      });

    },
  },
});
