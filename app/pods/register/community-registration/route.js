import Route from '@ember/routing/route';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

export default class extends Route {
  @service('navbar-title') navbarTitle;

  model(params) {
    return this.store.findRecord('organization', params.id);
  }

  @action
  didTransitions() {
    const name = this.get('model.name');

    this.get('navbarTitle').setTitle(name);

    return false;
  }
}
