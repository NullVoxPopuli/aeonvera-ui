import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    chooseWinner: function() {
      const model = this.get('model');

      model.set('chooseNewWinner', true);
      model.save().then(record => {
        this.get('flashMessages').success(
          'A new winner has been randomly chosen.'
        );
      }, failure => {

        this.get('flashMessages').alert(
          'Choosing a new winner failed. ' + failure
        );
      });
    }

  }
});
