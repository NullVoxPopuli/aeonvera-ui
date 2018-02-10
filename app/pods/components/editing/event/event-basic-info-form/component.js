import Component from '@ember/component';
import { or } from 'ember-decorators/object/computed';

import EditModel from 'aeonvera/mixins/edit-model';

export default Component.extend(EditModel, {
  saveSuccessPath: 'events.show.manage',
  cancelPath: 'events.show.manage',
  modelName: 'event',

  @or('model.hasDirtyAttributes', 'model.openingTier.hasDirtyAttributes') isDirty: null
});
