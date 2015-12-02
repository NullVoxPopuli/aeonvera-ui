import Ember from 'ember';

export default Ember.Component.extend({
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
      model.save().then((discount) => {
        this.get('flashMessages').success(
          'Saved Successfully'
        );
        // TODO: for some reason, ember loses track of the model upon redirection
        // this.get('router').transitionTo(
        //   'events.show.discounts.show', {
        //     discount_id: discount.get('id')
        //   });
      }, failure => {
        this.get('flashMessages').alert(
          'Saving failed. ' + failure
        );
      });

    },

    cancel: function() {
      this.get('model').rollbackAttributes();
      this.get('router').transitionTo('events.show.levels.show');
    },
  }
});
