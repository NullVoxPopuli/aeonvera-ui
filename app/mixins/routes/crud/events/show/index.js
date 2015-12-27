import Ember from 'ember';

export default Ember.Mixin.create({
  model: function(params) {
    console.log('show index route')
    console.log(params);
    let modelName = this.get('modelName');
    let path = 'events.show.' + modelName + 's.show';
    // why does this return the params?
    // and not call any of the console.logs?
    let obj = this.modelFor(path);
    // this.store.query('event-attendance', {
    //   level_id: level.get('id')
    // });
    return obj;
  }
});
