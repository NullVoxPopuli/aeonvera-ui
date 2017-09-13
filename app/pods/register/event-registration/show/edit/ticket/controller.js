import Ember from 'ember';
import RSVP from 'rsvp';
import { computed, action } from 'ember-decorators/object';
import { alias, sort, oneWay } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

import { dropTask } from 'ember-concurrency-decorators';

import RegistrationController from 'aeonvera/mixins/registration/controller';
import CurrentUserHelpers from 'aeonvera/mixins/current-user-helpers';


export default Ember.Controller.extend(CurrentUserHelpers, RegistrationController, {

  levelSort: ['name:asc'],
  packageSort: ['name:asc'],
  @sort('event.packages', 'packageSort') packages: null,
  @sort('event.levels', 'levelSort') levels: null,

  @alias('model.event') event: null,
  @alias('model.registration') registration: null,
  @alias('model.registration.level') selectedLevel: null,

  @oneWay('registration.unpaidOrder') order: null,


  didReceiveAttrs() {
    this._super(...arguments);

    this.set('selectedLevel', null);
    this.set('selectedPackage', null);
  },


  @computed('order.orderLineItems.@each.lineItem', 'registration')
  selectedPackage(orderLineItems) {
    return orderLineItems && orderLineItems
      .map(oli => oli.get('lineItem'))
      .find(li => li.get('klass') === 'Package');
  },

  @computed('selectedPackage', 'registration', 'order')
  mayProceed(selectedPackage, registration, order) {
    return (
      isPresent(selectedPackage) &&
      registration.get('isPersisted') &&
      order.get('isPersisted')
    );
  },

  @dropTask
  submitFormTask: function * () {
    const flash = this.get('flash');
    const registration = this.get('registration');
    const event = this.get('event');
    const selectedPackage = this.get('selectedPackage');
    const selectedLevel = this.get('selectedLevel');
    const requiresTrack = this.get('selectedPackage.requiresTrack');

    if (!selectedPackage) { return flash.error('Please select a ticket'); }
    if (requiresTrack && !selectedLevel) { return flash.error('Please select a track'); }

    return this.transitionToRoute('register.event-registration.show.edit.line-items', saved.id);
  },

  @action
  didUpdateSelectedPackage(selectedPackage) {
    const oldPackage = this.get('selectedPackage');
    const registration = this.get('registration');

    return registration.ensurePersisted()
      .then(() => this._ensureOrderExists())
      .then(() => this._updateOrCreateOrderLineItemForItem(
        oldPackage,
        selectedPackage))
      .then(() => this.set('selectedPackage', selectedPackage));
  },

  @action
  didUpdateSelectedLevel(selectedLevel) {
    const registration = this.get('registration');

    registration.set('level', selectedLevel);
    this.set('selectedLevel', selectedLevel);

    return registration.save();
  },

  @action
  skip() {
    const id = this.get('registration.id');

    this.transitionToRoute('register.event-registration.show.edit.line-items', id);
  },

  _ensureOrderExists() {
    const order = this.get('order');

    return RSVP.resolve(order).then(o => {
      if (o !== null) return RSVP.resolve(o);

      const order = this.get('store').createRecord('order', {
        host: this.get('event'),
        user: this.get('currentUser'),
        userName: this.get('registration.name'),
        userEmail: this.get('registration.attendeeEmail'),
        registration: this.get('registration')
      });

      this.set('order', order);

      return order.save();
    });
  }
});