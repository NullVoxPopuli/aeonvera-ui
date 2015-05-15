import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    linkToRoute: function(item) {
      console.log('waaaaaaa');
      this.transitionTo(item.route);
    },

    exitOffCanvas: function() {
      console.log('wat');
      this.$('a.exit-off-canvas').click();
    }

  }
});
