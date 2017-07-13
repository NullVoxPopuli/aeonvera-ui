import Ember from 'ember';
import RSVP from 'rsvp';

import { computed } from 'ember-decorators/object';
import { alias, oneWay, sort } from 'ember-decorators/object/computed';

import { dropTask } from 'ember-concurrency-decorators';

import currentUserHelpers from 'aeonvera/mixins/current-user-helpers';
import RegistrationController from 'aeonvera/mixins/registration/controller';

import { UNREGISTERED_ID } from 'aeonvera/models/registration';

const { isPresent, inject } = Ember;

export default Ember.Controller.extend(currentUserHelpers, RegistrationController, {
  flash: inject.service('flash-notification'),
  scroller: inject.service('scroller'),

  levelSort: ['name:asc'],
  packageSort: ['name:asc'],

  @alias('model.event') event: null,
  @alias('model.registration') registration: null,
  @sort('event.packages', 'packageSort') packages: null,

  @sort('event.levels', 'levelSort') levels: null,

  // begin used by the RegistrationController mixin
  @alias('event') host: null,
  @oneWay('registration.unpaidOrder') order: null,

  @computed('registration.{attendeeFirstName,attendeeLastName}')
  userName(first, last) {
    return `${first} ${last}`;
  },

  @alias('registration.attendeeEmail') userEmail: null,
  // end used by the RegistrationController mixin

  @alias('model.registration.level') selectedLevel: null,

  @computed('order.orderLineItems.@each.lineItem', 'registration')
  selectedPackage(orderLineItems) {
    return orderLineItems && orderLineItems
      .map(oli => oli.get('lineItem'))
      .find(li => li.get('klass') === 'Package');
  },

  _ensureOrderExists() {
    const order = this.get('order');

    return RSVP.resolve(order).then(o => {
      if (o !== null) return RSVP.resolve(o);

      const order = this.get('store').createRecord('order', {
        host: this.get('event'),
        user: this.get('currentUser'),
        userName: this.get('userName'),
        userEmail: this.get('userEmail'),
        attendance: this.get('registration')
      });

      this.set('order', order);

      return order.save();
    });
  },

  @dropTask
  submitFormTask: function * () {
    const flash = this.get('flash');
    const registration = this.get('registration');
    const event = this.get('event');
    const selectedPackage = this.get('selectedPackage');
    const selectedLevel = this.get('selectedLevel');
    const requiresTrack = this.get('selectedPackage.requiresTrack');

    const saved = yield registration.save();

    if (!selectedPackage) { return flash.error('Please select a ticket'); }
    if (requiresTrack && !selectedLevel) { return flash.error('Please select a track'); }

    if (event.get('isHousingEnabled')) {
      return this.transitionToRoute('register.event-registration.show.edit.housing', saved.id);
    }

    this.transitionToRoute('register.event-registration.show.index', saved.id);
  },

  actions: {
    didFinishInfo() {
      // next up: ticket
      const wrapper = document.querySelector('[data-scroll-ref="package-select"]');
      const top = wrapper.offsetTop;

      // 45 is the height of the navbar
      this.get('scroller').scrollVertical(wrapper, {
        offset: -45
      });
    },

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

    didUpdateSelectedLevel(selectedLevel) {
      const registration = this.get('registration');

      registration.set('level', selectedLevel);
      this.set('selectedLevel', selectedLevel);

      return registration.save();
    },

    didSubmitForm() {
      return this.get('submitFormTask').perform();
    }
  } // end actions
});
