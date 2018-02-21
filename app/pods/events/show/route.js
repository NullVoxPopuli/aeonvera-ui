import Route from '@ember/routing/route';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

export default class EventsShow extends Route {
  @service('navbar-title') navbarTitle;

  model(params) {
    return this.store.findRecord('event', params.event_id, {
      include: 'opening_tier,current_tier,integrations,sponsorships'
    });
  }

  @action
  didTransition() {
    const model = this.get('currentModel');
    const name = model.get('name');

    this.get('navbarTitle').setTitle(name);

    // Don't execute parent didTransitions
    return false;
  }
}
