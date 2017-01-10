import Ember from 'ember';
import ShowEdit from 'aeonvera/mixins/routes/crud/events/show/edit';

export default Ember.Route.extend(ShowEdit, {
  modelName: 'lesson',
  parentPathRoot: 'my-communities.manage',

  model() {
    let modelName = this.get('modelName');
    let parentPath = this.get('parentPathRoot');
    let path = parentPath + '.' + modelName + 's.show';
    let obj = this.modelFor(path);

    let parent = this.modelFor(parentPath);
    let hostId = parent.get('hostId');
    let hostType = parent.get('hostType');

    return {
      lesson: obj,
      hostId,
      hostType
    };
  }

});
