import Ember from 'ember';

export default Ember.Route.extend({
  // http://stackoverflow.com/questions/12150624/ember-js-multiple-named-outlet-usage
  renderTemplate: function() {
        // Render default outlet
        this.render();
        // render extra outlets
        this.render("welcome/menu-items", {
            outlet: "top-nav-menu-items",
            into: "application" // important when using at root level
        });
    }
});
