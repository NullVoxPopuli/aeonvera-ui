import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  flash: service('flash-notification'),

  modelNameId: function() {
    return this.get('modelName') + '_id';
  }.property('modelName'),

  isDirty: function() {
    return !this.get('model.hasDirtyAttributes');
  }.property('model.hasDirtyAttributes'),

  submitTitle: function() {
    if (this.get('isDirty')) {
      return 'Cannot save when there have been no changes';
    }
    return 'Save Changes';

  }.property('isDirty'),

  parentModelId: function() {

    const passedParent = this.get('parent');

    if (!isPresent(passedParent)) {
      console.log('parent not passed in, moving on...');
    } else {
      return passedParent.get('id');
    }

    const association = this.get('parentAssociation');

    if (!isPresent(association)) {
      console.log('association not found');
    }

    const parent = this.get('model').get(association);

    if (!isPresent(parent)) {
      console.log('parent not found');
    }

    if (isPresent(parent)) {
      return parent.get('id');
    }

    return '';
  }.property('model'),

  actions: {
    save: function() {
      const model = this.get('model');

      model.save().then(record => {
        this.get('flash').success(
          'Saved Successfully'
        );
        const path = this.get('saveSuccessPath');

        this.get('router').transitionTo(path, record);
      }, failure => {

        this.get('flash').alert(
          'Saving failed. ' + failure
        );
      });

    },

    cancel: function() {
      const path = this.get('cancelPath');

      this.get('model').rollbackAttributes();
      this.get('router').transitionTo(path);
    }
  }
});
