import Route from '@ember/routing/route';

import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default class extends Route {
  @service navbarTitle;

  model(params) {
    return this.get('store').findRecord('event', params.event_id, {
      include: 'shirts,integrations,competitions,line_items,discounts,packages'
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
