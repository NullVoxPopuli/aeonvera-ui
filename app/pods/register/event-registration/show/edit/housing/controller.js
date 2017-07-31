import Ember from 'ember';
import RSVP from 'rsvp';
import { computed } from 'ember-decorators/object';
import { alias, equal, oneWay } from 'ember-decorators/object/computed';

const { isPresent } = Ember;

const NO_HOUSING = 0;
const PROVIDING_HOUSING = 1;
const REQUESTING_HOUSING = 2;

export default Ember.Controller.extend({
  @alias('model.event') event: null,
  @alias('model.registration') registration: null,

  // NOTE: housingProvision is async: false on the registration
  @computed('registration.housingProvision')
  housingProvision(housingProvision) {
    const event = this.get('event');
    const registration = this.get('registration');

    if (isPresent(housingProvision)) return housingProvision;

    return this.store.createRecord('housing-provision', {
      host: event,
      registration: registration
    });
  },

  // NOTE: housingRequest is async: false on the registration
  @computed('registration.housingRequest')
  housingRequest(housingRequest) {
    const event = this.get('event');
    const registration = this.get('registration');

    if (isPresent(housingRequest)) return housingRequest;

    return this.store.createRecord('housing-request', {
      host: event,
      registration: registration
    });
  },

  @computed('housingRequest', 'housingProvision')
  selectedHousingOption(housingRequest, housingProvision) {
    if (housingProvision && !housingProvision.get('isNew')) return PROVIDING_HOUSING;
    else if (housingRequest && !housingRequest.get('isNew')) return REQUESTING_HOUSING;

    return NO_HOUSING;
  },


  actions: {
    // based on the selectedHousingOption,
    // persist/update the provision or request
    didSubmitHousing() {
      const option = parseInt(this.get('selectedHousingOption'));
      const housingProvision = this.get('housingProvision');
      const housingRequest = this.get('housingRequest');

      let handleHousing = RSVP.resolve();

      if (option === NO_HOUSING) {
        let promises = [];

        const requesting = housingRequest.get('isPersisted');
        const providing = housingProvision.get('isPersisted');

        // housing provision / request are async: false - so we can't unload them
        if (providing) promises.push(housingProvision.destroyRecord());
        if (requesting) promises.push(housingRequest.destroyRecord());

        handleHousing = RSVP.all(promises);
      } else if (option === PROVIDING_HOUSING) {
        handleHousing = this.get('housingProvision').save();
      } else if (option === REQUESTING_HOUSING) {
        handleHousing = this.get('housingRequest').save();
      }

      return handleHousing.then(() => {
        this.transitionToRoute('register.event-registration.show.edit.shirts');
      });
    }
  }

});
