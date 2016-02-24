import DS from 'ember-data';

var alreadyRun = false;

export default {
  name: 'model-extensions',
  initialize: function () {
    if (alreadyRun) {
      return;
    } else {
      alreadyRun = true;
    }

    // NOTE:
    // promise.data gets the raw json
    DS.Model.reopenClass({
      // modelName: function() {
      //   return this.get('constructor.modelName');
      // },

      // TODO: how to call this?
      isA: function (name) {
        return this.get('constructor.modelName') === name;
      }.property(),
    });
  },
};
