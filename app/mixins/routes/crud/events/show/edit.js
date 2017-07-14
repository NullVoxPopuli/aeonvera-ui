import Ember from 'ember';

export default Ember.Mixin.create({
  parentPathRoot: 'events.show',

  model: function() {
    const modelName = this.get('modelName');
    const path = this.get('parentPathRoot') + '.' + modelName + 's.show';
    const obj = this.modelFor(path);

    return obj;
  },

  actions: {
    //
    // willTransition: function(transition) {
    //
    //   const dirty = this.get('model.hasDirtyAttributes');
    //   const model = this.get('controller.content');
    //
    //   if (dirty && !confirm('Would you like to save your changes?')) {
    //     model.rollback();
    //     return true;
    //   }
    //   // model.save();
    //   return true;
    //
    //
    // }
  }
});
