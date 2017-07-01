import Ember from 'ember';
import { or } from 'ember-computed-decorators';

import EditModel from 'aeonvera/mixins/edit-model';

export default Ember.Component.extend(EditModel, {
  saveSuccessPath: 'events.show.manage',
  cancelPath: 'events.show.manage',
  modelName: 'event',

  @or('model.hasDirtyAttributes', 'model.openingTier.hasDirtyAttributes') isDirty: null
});
