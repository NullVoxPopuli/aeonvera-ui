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

        // TODO: WHY does this not work? model isn't found
        // ember inspector finds it though
        // refresh and it's still there
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
      this.get('router').transitionTo('events.show.discounts.show');
    },
  }
});
