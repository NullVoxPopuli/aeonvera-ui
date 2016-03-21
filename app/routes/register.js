import Ember from 'ember';

export default Ember.Route.extend({

  // beforeModel: function(transition){
  //   let subdomain = transition.params.register.subdomain;
  //
  //   let topLevelRoutes = [
  //     'logout', 'login', 'signup', 'donation-thankyou',
  //     'password-reset', 'dance-event', 'dance-community', 'welcome', 'dashboard',
  //     'upcoming-events', 'communities', 'user', 'not-found'
  //   ];
  //
  //   if (topLevelRoutes.indexOf(subdomain) !== -1){
  //     transition.abort();
  //     this.redirect('welcome');
  //     return;
  //   }
  // },

  model: function (params) {
    let subdomain = params.subdomain;



    return this.get('store').findRecord('host', subdomain, {
      adapterOptions: {
        query: {
          subdomain: subdomain,
          include: 'integrations,packages,levels,competitions,lessons,membership_options,membership_discounts',
        },
      },
    });
  },

});
