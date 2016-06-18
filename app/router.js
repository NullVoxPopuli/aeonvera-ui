import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function() {
  this.route('logout');
  this.route('login');
  this.route('signup');
  this.route('donation-thankyou');
  this.route('password-reset', function() {
    this.route('success');
    this.route('reset-success');
    this.route('edit');
  });
  this.route('confirmation', function() {
    this.route('success');
    this.route('new');
    this.route('new-success');
  });
  this.route('collaboration', function() {
    this.route('success');
  });

  /* public facing */
  this.route('welcome', { resetNamespace: true }, function() {
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
  this.route('dashboard', { path: '/' }, function() {
    this.route('my-communities', {
      resetNamespace: true,
    }, function() {
      this.route('manage', {
        path: '/manage/:organization_id',
      }, function() {
        this.route('edit');
        this.route('payment-processors');
        this.route('revenue');
        this.route('registrations');
        this.route('unpaid-registrations');
        this.route('dances', function() {
          this.route('new');
          this.route('show', {
            path: ':dance_id',
          }, function() {
            this.route('edit');
          });
        });

        this.route('lessons', function() {
          this.route('new');
          this.route('show', {
            path: ':lesson_id',
          }, function() {
            this.route('edit');
          });
        });

        this.route('collaboration');
        this.route('reports');
        this.route('officers');
        this.route('membership', function() {
          this.route('manage');
          this.route('add');
          this.route('discounts', function() {
            this.route('new');
            this.route('show', {
              path: ':discount_id',
            }, function() {
              this.route('edit');
            });
          });

          this.route('membership-options', function() {
            this.route('new');
            this.route('show', {
              path: ':membership_option_id',
            }, function() {
              this.route('edit');
            });
          });
        });
        this.route('embed-registration');
      });
    });

    this.route('hosted-events');
    this.route('registered-events');
    this.route('orders');

    this.route('event-at-the-door', { resetNamespace: true, path: '/event-at-the-door/:event_id' }, function() {
      this.route('checkin');
      this.route('competition-list');
      this.route('a-la-carte');
    });

    this.route('events', { resetNamespace: true }, function() {
      this.route('new');
      this.route('show', { path: ':event_id' }, function() {
        this.route('edit', function() {
          this.route('housing');
          this.route('options');
          this.route('customization');
          this.route('payment-processors');
          this.route('sponsors');
        });

        /* attendees, volunteers, etc */
        this.route('registrations', function() {
          this.route('new');
          this.route('show', {
            path: ':registration_id',
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

        this.route('collaboration');

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
            path: ':level_id',
          }, function() {
            this.route('edit');
          });
        });

        this.route('packages', function() {
          this.route('new');
          this.route('show', {
            path: ':package_id',
          }, function() {
            this.route('edit');
          });
        });

        this.route('line-items', function() {
          this.route('new');
          this.route('show', {
            path: ':line_item_id',
          }, function() {
            this.route('edit');
          });
        });

        this.route('shirts', function() {
          this.route('new');
          this.route('show', {
            path: ':shirt_id',
          }, function() {
            this.route('edit');
          });
        });

        this.route('competitions', function() {
          this.route('new');
          this.route('show', {
            path: ':competition_id',
          }, function() {
            this.route('edit');
          });
        });

        this.route('raffles', function() {
          this.route('new');
          this.route('show', {
            path: ':raffle_id',
          }, function() {
            this.route('edit');
            this.route('raffle-tickets', function() {
              this.route('new');
              this.route('show', {
                path: ':raffle_ticket_id',
              });
            });
          });
        });

        this.route('custom-fields', function() {
          this.route('new');
          this.route('show', {
            path: ':custom_field_id',
          }, function() {
            this.route('edit');
          });
        });

        this.route('discounts', function() {
          this.route('new');
          this.route('show', {
            path: ':discount_id',
          }, function() {
            this.route('edit');
          });
        });

        this.route('pricing-tiers', function() {
          this.route('new');
          this.route('show', {
            path: ':pricing_tier_id',
          }, function() {
            this.route('edit');
          });
        });
        this.route('embed-registration');
      });
    });

  });

  this.route('embed', { path: '/embed/:subdomain' });
  this.route('register', { resetNamespace: true, path: ':subdomain' }, function() {
    this.route('checkout', { path: ':orderId' }, function() {
      this.route('edit');
      this.route('thankyou');
    });
  });

  this.route('event-not-found');

  this.route('upcoming-events');
  this.route('communities');

  this.route('user', { resetNamespace: true, }, function() {
    this.route('edit');
  });

  /*
    404ish
  */
  this.route('not-found', {
    path: '/*path',
  });
});

export default Router;
