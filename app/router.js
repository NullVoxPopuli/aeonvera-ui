import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});
/*
  Notes:

  route == verb
  resource == noun

  this.resource('post', function(){
    this.route('comment'); // PostCommentRoute
    this.resource('comment'); // CommentRoute
  });

  index route is automatic
*/
export default Router.map(function() {

  this.route('logout');
  this.route('login');
  this.route('signup');
  this.route('password-reset', function() {
    this.route('success');
  });

  /* event registration - subdomain based */
  this.route('dance-event');
  /* organization registration - subdomain based */
  this.route('dance-organization');


  /* public facing */
  this.route('welcome', {
    resetNamespace: true
  }, function() {
    this.route('features');
    this.route('pricing');
    this.route('faq');
    this.route('tos', function() {
      this.route('organizers');
      this.route('non-organizers');
      this.route('updates');
    });
    this.route('opensource');
    this.route('privacy');
    this.route('about');
  });

  /* must be logged in for */
  this.route('dashboard', {
    path: '/'
  }, function() {
    this.route('hosted-events');
    this.route('registered-events');
    this.route('orders');

    this.route('event-at-the-door', {
      resetNamespace: true,
      path: '/event-at-the-door/:event_id'
    }, function() {
      this.route('checkin');
      this.route('competition-list');
      this.route('a-la-carte');
    });
    this.route('events', {
      resetNamespace: true
    }, function() {
      this.route('show', {
        path: ':event_id'
      }, function() {
        this.route('edit', function() {
          this.route('housing');
          this.route('options');
          this.route('customization');
          this.route('payment-processors');
        });

        /* attendees, volunteers, etc */
        this.route('registrations', function() {
          this.route('new');
          this.route('show', {
            path: ':registration_id'
          }, function() {
            this.route('edit');
          });
        });
        this.route('unpaid-registrations');
        this.route('cancelled-registrations');
        this.route('revenue');
        this.route('charts');
        this.route('manage');
        this.route('volunteers', function() {
          this.route('new');
        });

        this.route('checkin', function() {
          this.route('take-payment');
        });

        this.route('housing', function() {
          this.route('requests', function() {
            this.route('new');
          });
          this.route('provisions', function() {
            this.route('new');
          });
        });

        /* manage routes */
        this.route('levels', function() {
          this.route('new');
          this.route('show', {
            path: ':level_id'
          }, function() {
            this.route('edit');
          });
        });
        this.route('packages', function() {
          this.route('new');
          this.route('show', {
            path: ':package_id'
          }, function() {
            this.route('edit');
          });
        });
        this.route('a-la-carte-items', function() {
          this.route('new');
          this.route('show', {
            path: ':package_id'
          }, function() {
            this.route('edit');
          });
        });
        this.route('shirts', function() {
          this.route('new');
          this.route('show', {
            path: ':package_id'
          }, function() {
            this.route('edit');
          });
        });
        this.route('raffles', function() {
          this.route('new');
          this.route('show', {
            path: ':package_id'
          }, function() {
            this.route('edit');
          });
        });
        this.route('custom-fields', function() {
          this.route('new');
          this.route('show', {
            path: ':package_id'
          }, function() {
            this.route('edit');
          });
        });
        this.route('discounts', function() {
          this.route('new');
          this.route('show', {
            path: ':discount_id'
          }, function() {
            this.route('edit');
          });
        });
        this.route('pricing-tiers', function() {
          this.route('new');
          this.route('show', {
            path: ':pricing_tier_id'
          }, function() {
            this.route('edit');
          });
        });
      });
    });

  });

  this.route('register', {
    path: 'r'
  }, function() {
    this.route('level');
    this.route('packages');
  });

  this.route("upcoming-events");
  this.route('communities');

  this.route('user', {
    resetNamespace: true
  }, function() {
    this.route('edit');
  });


  /*
    404ish
  */
  this.route('not-found', {
    path: '/*path'
  });
});
