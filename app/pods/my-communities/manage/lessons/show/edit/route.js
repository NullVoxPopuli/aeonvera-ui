import Ember from 'ember';
import ShowEdit from 'aeonvera/mixins/routes/crud/events/show/edit';

export default Ember.Route.extend(ShowEdit, {
  modelName: 'lesson',
  parentPathRoot: 'my-communities.manage',

  model() {
    const modelName = this.get('modelName');
    const parentPath = this.get('parentPathRoot');
    const path = parentPath + '.' + modelName + 's.show';
    const obj = this.modelFor(path);

    const parent = this.modelFor(parentPath);
    const hostId = parent.get('hostId');
    const hostType = parent.get('hostType');

    return {
      lesson: obj,
      hostId,
      hostType
    };
  }

});
