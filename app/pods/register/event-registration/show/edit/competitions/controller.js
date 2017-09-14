import Ember from 'ember';
import { action } from 'ember-decorators/object';
import { alias, sort, oneWay } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

import { dropTask } from 'ember-concurrency-decorators';

import OLIPersistence from 'aeonvera/mixins/registration/order-line-item-persistence';

export default Ember.Controller.extend(OLIPersistence, {
  @service('rollbar') rollbar: null,
  @service('flash-notification') flash: null,

  @alias('model.registration.unpaidOrder') order: null,
  @alias('model.registration') registration: null,
  @alias('model.event') event: null,

  competitionSort: ['name:asc'],
  @sort('model.event.competitions', 'competitionSort') competitions: null,

  @dropTask
  removeCompetitionTask: function * (orderLineItem) {
    // just in case it's a promise
    const oli = yield orderLineItem;

    yield oli.destroyRecord();
    this.get('order.orderLineItems').removeObject(orderLineItem);
  },

  @dropTask
  addCompetitionTask: function * (competition, params) {
    yield this.get('addOrderLineItem').perform(competition, params);
  },

  @dropTask
  updateCompetitionTask: function * (orderLineItem) {
    const oli = yield orderLineItem;

    yield oli.save();
  },

  @action
  didFinishSelectingCompetitions() {
    const registrationId = this.get('model.registration.id');
    const eventId = this.get('model.event.id');
    const domain = this.get('model.event.domain');

    // correct option isn't working. HACK TIME
    // window.location = `/${domain}/register/${eventId}/${registrationId}`;
    // pass all ids to trigger a full model refresh
    this.send('triggerRefreshForOrderReview');
  }
});
