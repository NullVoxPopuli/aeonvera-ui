import Ember from 'ember';

export default Ember.Mixin.create({
  modelNameId: function() {
    return this.get('modelName') + '_id';
  }.property('modelName'),

  isDirty: function() {
    return !this.get('model.hasDirtyAttributes');
  }.property('model.hasDirtyAttributes'),

  submitTitle: function() {
    if (this.get('isDirty')) {
      return 'Cannot save when there have been no changes';
    } else {
      return 'Save Changes';
    }
  }.property('isDirty'),

  parentModelId: function() {

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
    save: function() {
      let model = this.get('model');

      model.save().then((record) => {
        this.get('flashMessages').success(
          'Saved Successfully'
        );
        let path = this.get('saveSuccessPath');
        this.get('router').transitionTo(path, recordId);
      }, failure => {
        this.get('flashMessages').alert(
          'Saving failed. ' + failure
        );
      });

    },

    cancel: function() {
      let path = this.get('cancelPath');

      this.get('model').rollbackAttributes();
      this.get('router').transitionTo(path);
    },
  }
});
