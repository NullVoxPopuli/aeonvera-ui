import Ember from 'ember';

export default Ember.Component.extend({
  mediumEditorOptions: {},

  actions: {
    onFinish() {
      const finished = this.get('onFinish');

      if (finished) {
        this.sendAction(finished);
      }
    }
  }
});
