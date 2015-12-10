import Ember from 'ember';

export default Ember.Mixin.create({
  modelNameId: function() {
    return this.get('modelName') + '_id';
  }.property('modelName'),

  isDirty: function() {
    return !this.get('model.hasDirtyAttributes');
  }.property('model.hasDirtyAttributes'),

  submitTitle: function() {
    if (this.get('isDirty')) {
      return 'Cannot save when there have been no changes';
    } else {
      return 'Save Changes';
    }
  }.property('isDirty'),

  actions: {
    save: function() {
      let model = this.get('model');
      model.save().then((record) => {
        this.get('flashMessages').success(
          'Saved Successfully'
        );
        let path = this.get('saveSuccessPath');
        let params = {};
        params[this.get('modelNameId')] = record.get('id');

        this.get('router').transitionTo(path, params);
      }, failure => {
        this.get('flashMessages').alert(
          'Saving failed. ' + failure
        );
      });

    },

    cancel: function() {
      let path = this.get('cancelPath');

      this.get('model').rollbackAttributes();
      this.get('router').transitionTo(path);
    },
  }
});
