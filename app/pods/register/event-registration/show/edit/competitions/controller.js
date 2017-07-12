import Ember from 'ember';
import { action } from 'ember-decorators/object';
import { alias, sort } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

import { dropTask } from 'ember-concurrency-decorators';


export default class extends Ember.Controller {
  @service('rollbar') rollbar;
  @service('flash-notification') flash;

  @alias('model.registration.unpaidOrder') order;

  competitionSort = ['name:asc'];
  @sort('model.event.competitions', 'competitionSort') competitions;

  @dropTask
  removeCompetitionTask = function * (orderLineItem) {
    // just in case it's a promise
    const oli = yield orderLineItem;

    yield oli.destroyRecord();
    this.get('order.orderLineItems').removeObject(orderLineItem);
  }

  @dropTask
  addCompetitionTask = function * (competition, params) {
    const store = this.get('store');

    const orderLineItem = store.createRecord('orderLineItem', {
      ...params,
      lineItem: competition
    });

    const savedOrderLineItem = yield orderLineItem.save();

    this.get('order.orderLineItems').pushObject(orderLineItem);
  }

  @dropTask
  updateCompetitionTask = function * (orderLineItem) {
    const oli = yield orderLineItem;

    yield oli.save();
  }

  @action
  didFinishSelectingCompetitions() {
    this.transitionToRoute('register.event-registration.show.index');
  }
}
