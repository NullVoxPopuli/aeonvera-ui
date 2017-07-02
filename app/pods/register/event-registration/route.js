import Ember from 'ember';
import { computed } from 'ember-decorators/object';
import { not } from 'ember-decorators/object/computed';

const { inject } = Ember;

const eventInclude = Ember.String.w(`
  packages
  shirts
  levels
  competitions
  line_items
  custom_fields
  sponsorships
  pricing_tiers
`).join(',');

export default Ember.Route.extend({
  session: inject.service(),

  // TODO: maybe eventually make requiring to login optional?
  @not('session.isAuthenticated') mustLogin: null,

  model(params) {
    return this.store.findRecord('event', params.id, { include: eventInclude });
  },

  afterModel(model, transition) {
    if (!model.get('registrationIsOpen')) {
      return this.transitionTo('register.event-registration.not-yet', model);
    }

    if (this.get('mustLogin')) {
      return this.transitionTo('register.event-registration.must-login', model);
    }
  }
});
