import Ember from 'ember';

export default Ember.Mixin.create({
  model: function() {
    let modelName = this.get('modelName');
    let path = 'events.show.' + modelName + 's.show';
    let obj = this.modelFor(path);
    return obj;
  },

  actions: {

    willTransition: function(transition) {

      let dirty = this.get('model.hasDirtyAttributes');
      let model = this.get('controller.content');

      if (dirty && !confirm("Would you like to save your changes?")) {
        model.rollback();
        return true;
      } else {
        model.save();
        return true;
      }

    }
  }
});
