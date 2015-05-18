import Ember from 'ember';

export default Ember.Route.extend({


  activate: function() {
    this.set('title', this.t('appname'));
    this._super();
  },

  // http://stackoverflow.com/questions/12150624/ember-js-multiple-named-outlet-usage
  renderTemplate: function() {

    // Render default outlet
    this.render();

    // render footer
    this.render('shared/footer', {
      outlet: 'bottom-footer',
      into: 'application'
    });

  }
});
