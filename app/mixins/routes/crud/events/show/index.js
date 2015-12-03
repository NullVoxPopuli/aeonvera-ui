import Ember from 'ember';

export default Ember.Mixin.create({
  model: function() {
    let modelName = this.get('modelName');
    let path = 'events.show.' + modelName + 's.show';

    let obj = this.modelFor(path);
    // this.store.query('event-attendance', {
    //   level_id: level.get('id')
    // });
    return obj;
  }
});
