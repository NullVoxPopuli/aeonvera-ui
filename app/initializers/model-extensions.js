import Ember from 'ember';
import DS from 'ember-data';
import RSVP from 'rsvp';

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
      }),

      generateIdForRecord: function() {
        let d = new Date().getTime();
        const uuid = 'xxxxyyyxxxxxxxxyyxyxxxyyy'.replace(/[xy]/g, function(c) {
          let r = (d + Math.random() * 16) % 16 | 0;

          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });

        return uuid;
      },

      ensurePersisted() {
        if (this.get('hasDirtyAttributes')) return this.save();

        return RSVP.resolve(this);
      }
    });

    Ember.CoreObject.reopen({
      asPromiseObject() {
        return Ember.RSVP.resolve(this);
      }
    });
  }
};
