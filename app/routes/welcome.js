import Ember from 'ember';

export default Ember.Route.extend({
  // http://stackoverflow.com/questions/12150624/ember-js-multiple-named-outlet-usage
  renderTemplate: function() {
        // Render default outlet
        this.render();
        // render extra outlets
        this.render('welcome/menu-items', { // template to render
            outlet: 'top-nav-left-menu-items',   // outlet name
            into: 'shared/menu/menu'       // template to render in to
        });

        // render footer
        this.render('shared/footer', {
          outlet: 'bottom-footer',
          into: 'application'
        });
    }
});
