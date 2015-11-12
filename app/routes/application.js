import Ember from 'ember';
import ApplicationRouteMixin from
  'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service('session'),
  subdomain: Ember.inject.service('subdomain'),

  // intl: Ember.inject.service(),
  beforeModel: function(transition) {
    var self = this;
    //   // define the app's runtime locale
    //   // For example, here you would maybe do an API lookup to resolver
    //   // which locale the user should be targeted and perhaps lazily
    //   // load translations using XHR and calling intl's `addTranslation`/`addTranslations`
    //   // method with the results of the XHR request
    //   this.get('intl').setLocale('en-us');


    // check if there is a subdomain
    // if there is, send a request to get the model matching the subdomain, as
    // every event / organization most have a unique subdomain.
    // redirect to the appropriate route (event or organization)
    // based on what type of model comes back.
    //

    if (this.get('subdomain.present')) {
      let type = this.get('subdomain.subdomainType');
      if (type === 'event') {
        self.transitionTo('dance-event');
      } else if (type === 'organization') {
        self.transitionTo('dance-organization');
      }
      // otherwise proceed as normal?
    }

    this._super(transition);
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

  },

  sessionAuthenticated: function() {
    this._super();

    // close the modal
    Ember.$('a.close-reveal-modal').trigger('click');

    // notify of success
    Ember.get(this, 'flashMessages').success(
      'You have successfully logged in');
  },

  actions: {

    linkToRoute: function(item) {
      this.transitionTo(item.route);
    },

    exitOffCanvas: function() {
      this.$('a.exit-off-canvas').click();
    },

    redirectToLogin: function() {
      this.transitionTo('login');
    },

    redirectToSignup: function() {
      this.transitionTo('signup');
    },

    invalidateSession: function() {
      this.get('session').invalidate();
      localStorage.clear();
    },

    transitionToLoginRoute: function() {
      //  this.transitionTo('login');
      this.transitionTo('welcome');
    }

  }
});
