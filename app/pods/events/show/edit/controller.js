import Ember from 'ember';
import RSVP from 'rsvp';
import { or } from 'ember-decorators/object/computed';

export default Ember.Controller.extend({
  flash: Ember.inject.service('flash-notification'),

  saveSuccessPath: 'events.show.manage',
  cancelPath: 'events.show.manage',
  modelName: 'event',

  @or('model.hasDirtyAttributes', 'model.openingTier.hasDirtyAttributes')
  isDirty: null,

  submitTitle: function() {
    if (this.get('isDirty')) {
      return 'Cannot save when there have been no changes';
    }
    return 'Save Changes';

  }.property('isDirty'),

  actions: {
    save: function() {
      const model = this.get('model');
      const name = model.get('name');
      const flash = this.get('flash');
      const openingTier = this.get('model.openingTier');

      const promise = RSVP.all([
        model.save(),
        openingTier.save()
      ]);

      flash.notify({
        rollbar: true,
        begin: `Saving ${name}...`,
        success: `${name} saved!`,
        error: `Could not save ${name}!`
      }, promise);

      promise.then(() => this.transitionToRoute('events.show.manage'));
    },

    cancel: function() {
      const path = this.get('cancelPath');

      this.get('model').rollbackAttributes();
      this.transitionToRoute(path);
    }
  }
});
