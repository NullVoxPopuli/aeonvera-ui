import Component from '@ember/component';

import { computed } from 'ember-decorators/object';
import { alias, filterBy } from 'ember-decorators/object/computed';

export default class extends Component {
  // competition = null;
  additionalRows = 0;

  @alias('competition.orderLineItems') orderLineItems;
  @filterBy('orderLineItems', 'danceOrientation', 'Lead') leads;
  @filterBy('orderLineItems', 'danceOrientation', 'Follow') follows;

  @alias('leads.length') numberOfLeads;
  @alias('follows.length') numberOfFollows;

  @computed('numberOfFollows', 'numberOfLeads')
  extraLeads(follows, leads) {
    const diff = leads - follows;

    return diff > 0 ? diff : 0;
  }

  @computed('numberOfFollows', 'numberOfLeads')
  extraFollows(follows, leads) {
    const diff = follows - leads;

    return diff > 0 ? diff : 0;
  }

  @computed('additionalRows', 'extraFollows')
  extraLeadRows(additional, follows) {
    return parseInt(additional) + parseInt(follows);
  }

  @computed('additionalRows', 'extraLeads')
  extraFollowRows(additional, leads) {
    return parseInt(additional) + parseInt(leads);
  }
}
