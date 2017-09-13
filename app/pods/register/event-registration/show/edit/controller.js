import Ember from 'ember';

import { computed } from 'ember-decorators/object';
import { alias, gt } from 'ember-decorators/object/computed';

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

  @gt('event.competitions.length', 0) hasCompetitions;
  @gt('event.packages.length', 0) hasTickets;
  @alias('event.hasActiveLineItems') hasLineItems;

  @computed('hasHousing', 'hasShirts', 'hasCompetitions')
  showTopNav(hasHousing, hasShirts, hasCompetitions) {
    // need at least one to make it worth while to show the nav at all
    return (hasHousing || hasShirts || hasCompetitions);
  }


}
