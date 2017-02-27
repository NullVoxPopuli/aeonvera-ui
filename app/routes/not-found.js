import Ember from 'ember';

export default Ember.Route.extend({
  // renderTemplate: function () {
  //   this.render('not-found', {
  //     into: 'application',
  //   });
  // },

  activate: function() {
    Ember.run.later(function() {
      Ember.$('#tetris-game').blockrain({
        autoplay: false,
        autoplayRestart: true,
        theme: 'modern'

        // playText: 'How about tetris isntead?'
      });

    });

  }

});
