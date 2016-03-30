import Ember from 'ember';

export default Ember.Mixin.create({
  parentPathRoot: 'events.show',
  model: function (params) {
    let modelName = this.get('modelName');
    let path = this.get('parentPathRoot') + '.' + modelName + 's.show';

    let obj = this.modelFor(path);
    return obj;
  },
});
