import Ember from 'ember';
import RSVP from 'rsvp';

import computed, { alias, oneWay } from 'ember-computed-decorators';

import currentUserHelpers from 'aeonvera/mixins/current-user-helpers';
import RegistrationController from 'aeonvera/mixins/registration/controller';

const { isPresent, inject } = Ember;

export default Ember.Controller.extend(currentUserHelpers, RegistrationController, {
  flash: inject.service('flash-notification'),
  scroller: inject.service('scroller'),


  @alias('model.event') event: null,
  @alias('model.registration') registration: null,
  @alias('event.packages') packages: null,
  @alias('event.levels') levels: null,

  // begin used by the RegistrationController mixin
  @alias('event') host: null,
  @oneWay('registration.unpaidOrder') order: null,

  @computed('registration.{attendeeFirstName,attendeeLastName}')
  userName(first, last) {
    return `${first} ${last}`;
  },

  @alias('registration.attendeeEmail') userEmail: null,
  // end used by the RegistrationController mixin

  @computed('order.orderLineItems.@each.lineItem')
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
          selectedPackage
        ));
    },

    didUpdateSelectedLevel(selectedLevel) {
      const registration = this.get('registration');

      registration.set('level', selectedLevel);

      return registration.save();
    },

    didSubmitForm() {
      const event = this.get('event');
      const registration = this.get('registration');

      registration.save().then(saved => {
        if (event.get('isHousingEnabled')) {
          return this.transitionToRoute('register.event-registration.show.housing', saved.id);
        }

        this.transitionToRoute('register.event-registration.show.index', saved.id);
      });
    }
  } // end actions
});
