import Ember from 'ember';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

import { dropTask } from 'ember-concurrency-decorators';


export default class extends Ember.Controller {
  @service('rollbar') rollbar;
  @service('flash-notification') flash;

  @dropTask
  removeCompetitionTask = function * (orderLineItem) {
    // just in case it's a promise
    const oli = yield orderLineItem;

    try {
      return yield oli.destroyRecord();
    } catch (e) {
      this.get('flash').alert('Could not remove shirt');
      this.get('rollbar').warning('deleting competition orderLineITem', e);
    }
  }

  @dropTask
  addCompetitionTask = function * (competition, order, partnerName, danceOrientation) {
    const store = this.get('store');

    const orderLineItem = store.createRecord('orderLineItem', {
      order,
      lineItem: competition,
      partnerName,
      danceOrientation
    });

    try {
      return yield orderLineItem.save();
    } catch (e) {
      this.get('flash').alert('Could not add competition');
      orderLineItem.unloadRecord();
      this.get('rollbar').warning('creating competition orderLineItem', e);
    }
  }

  @dropTask
  updateCompetitionTask = function * (orderLineItem) {

  }

  @action
  didFinishSelectingCompetitions() {
    this.transitionToRoute('register.event-registration.show.index');
  }
}
