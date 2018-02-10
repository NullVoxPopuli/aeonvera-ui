import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import EditModel from 'aeonvera/mixins/edit-model';

export default Mixin.create(EditModel, {
  flash: service('flash-notification'),

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
        const parentId = this.get('parentModelId');
        const recordId = record.get('id');

        const numberOfShows = path.match(/show|manage/g).length;

        if (numberOfShows === 2) {
          this.get('router').transitionTo(path, parentId, recordId);
        } else { // (numberOfShows === 1) {
          this.get('router').transitionTo(path, parentId);
        }
      }, failure => {

        this.get('flash').alert(
          'Saving failed. ' + failure
        );
      });

    }
  }
});
