import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  // intl: Ember.inject.service(),
  beforeModel: function(){
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
    // TODO: should this be a service?

    // if (this.get('hasSubdomain')){
    //   this.get('modelForSubdomain').then(function(model){
    //     let type = model.get('type');
    //     if (type === 'event'){
    //       self.transitionTo('dance-event');
    //     } else if (type === 'organization'){
    //       self.transitionTo('dance-organization');
    //     }
    //     // otherwise proceed as normal?
    //   });
    // }

  },

  modelForSubdomain: function(){
    let currentSubdomain = this.get('currentSubdomain');

    Ember.$.ajax({
      url: '/api/host_for?subdomain=' + currentSubdomain
    });

  }.property('currentSubdomain'),

  hasSubdomain: function(){
    return Ember.isPresent(this.get('currentSubdomain'));
  }.property('currentSubdomain'),

  currentSubdomain: function(){
    let domain = /:\/\/([^\/]+)/.exec(window.location.href)[1];
    let domainParts = domain.split('.');
    domainParts.pop(); // remove TLD
    domainParts.pop(); // remove domain
    let subdomain = domainParts.join('.');

    if (subdomain.ToLowerCase() === 'www'){
      return '';
    }

    return subdomain;
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

    sessionAuthenticationSucceeded: function() {
      // close the modal
      Ember.$('a.close-reveal-modal').trigger('click');

      // set user and redirect
      this.transitionTo('dashboard');

      // notify of success
      Ember.get(this, 'flashMessages').success(
        'You have successfully logged in');
    },

    sessionAuthenticationFailed: function(error) {
      Ember.Logger.debug('Session authentication failed!');

      Ember.$('#login-error-message .message').text(error.error || error);
      Ember.$('#login-error-message').show();
    }

  }
});
