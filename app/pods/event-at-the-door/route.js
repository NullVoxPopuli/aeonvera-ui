import Ember from 'ember';

import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default class extends Ember.Route {
  @service('navbar-title') navbarTitle;

  model(params) {
    return this.get('store').findRecord('event', params.event_id, {
      include: 'shirts,integrations,competitions,line_items,discounts'
    });
  }

  actions = {
    didTransition() {
      const name = this.get('currentModel.name');
      const navbarTitle = this.get('navbarTitle');

      navbarTitle.showSideNav();
      navbarTitle.setAppNavTitle(name);

      // Don't execute parent didTransitions
      return false;
    }
  }
}
