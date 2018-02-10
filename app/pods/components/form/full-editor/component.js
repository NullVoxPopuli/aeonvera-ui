import Component from '@ember/component';

export default Component.extend({
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
