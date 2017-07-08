import Ember from 'ember';

import { computed } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

export default class extends Ember.Controller {
  @alias('model.event') event;
  @alias('model.registration') registration;
  @alias('event.isHousingEnabled') hasHousing;

  @computed('event')
  hasShirts(event) {
    const hasShirts = event.get('shirts.length') > 0;
    const shirtSalesEndAt = event.get('shirtSalesEndAt');
    const areShirtSalesOver = moment().isAfter(shirtSalesEndAt);
    const showShirts = (hasShirts && !areShirtSalesOver);

    return showShirts;
  }

  @computed('event')
  hasCompetitions(event) {
    const hasCompetitions = event.get('competitions.length') > 0;

    return hasCompetitions;
  }

  @computed('hasHousing', 'hasShirts', 'hasCompetitions')
  showTopNav(hasHousing, hasShirts, hasCompetitions) {
    // need at least one to make it worth while to show the nav at all
    return (hasHousing || hasShirts || hasCompetitions);
  }


}
