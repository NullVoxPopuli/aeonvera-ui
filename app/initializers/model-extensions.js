import Ember from 'ember';
import DS from 'ember-data';

var alreadyRun = false;

export default {
  name: 'model-extensions',
  initialize: function() {
    if (alreadyRun) {
      return;
    } else {
      alreadyRun = true;
    }

    DS.Model.reopen({
      klass: Ember.computed(function() {
              let emberModelName = this.get('constructor.modelName');
              let result = emberModelName.singularize().camelize().capitalize();
              return result;
            })
    });

    Ember.CoreObject.reopen({
      asPromiseObject() {
        return DS.PromiseObject.create({
          promise: this
        });
      }
    });
  }
};
