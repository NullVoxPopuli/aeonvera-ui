import Ember from 'ember';
import DS from 'ember-data';

let alreadyRun = false;

export default {
  name: 'model-extensions',
  initialize: function() {
    if (alreadyRun) {
      return;
    }
    alreadyRun = true;


    DS.Model.reopen({
      klass: Ember.computed(function() {
        const emberModelName = this.get('constructor.modelName');
        const result = emberModelName.singularize().camelize().capitalize();

        return result;
      }),

      isPersisted: Ember.computed(function() {
        return !this.get('isNew');
      })
    });

    Ember.CoreObject.reopen({
      asPromiseObject() {
        return Ember.RSVP.resolve(this);
      }
    });
  }
};
