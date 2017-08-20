import Ember from 'ember';

import { computed } from 'ember-decorators/object';

export default class extends Ember.Component {
  queryText = '';
  showOnlyNonCheckedIn = false;
  showOnlyThoseWhoOweMoney = false;

  activeRegistrant = null;

  columns = [
    { property: 'attendeeName', title: 'Name' },
    { property: 'isCheckedIn', title: '', sort: false },
    { property: '', title: 'Purchases', sort: false },
    { property: 'checkedInAt', title: 'Checked in at' }
  ];

  @computed('model', 'queryText', 'showOnlyNonCheckedIn', 'showOnlyThoseWhoOweMoney')
  registrations(model, query, onlyNonCheckedIn, onlyOweMoney) {
    const queryPresent = Ember.isPresent(query);
    const lowerQuery = query.toLowerCase();

    let filtered = model;

    if (onlyNonCheckedIn) {
      filtered = filtered.filterBy('isCheckedIn', false);
    }

    if (onlyOweMoney) {
      filtered = filtered.filterBy('owesMoney');
    }

    if (queryPresent) {
      filtered = filtered.filter(function(ea) {
        const name = ea.get('attendeeName').toLowerCase();

        return name.includes(lowerQuery);
      });
    }

    return filtered;
  }

  @computed('model.@each.isCheckedIn')
  percentCheckedIn() {
    const checkedIn = this.get('numberCheckedIn');
    /* var checkedOut = this.get('numberCheckedOut'); */
    const total = this.get('model').get('length');
    const percent = checkedIn / total * 100;

    return Math.round(percent);
  }

  @computed('model.@each.isCheckedIn')
  numberCheckedIn() {
    const model = this.get('model');

    return model.filterBy('isCheckedIn').get('length');
  }

  @computed('model.@each.isCheckedIn')
  numberNotCheckedIn() {
    const model = this.get('model');

    return model.filterBy('isCheckedIn', false).get('length');
  }

  actions = {
    setActiveRegistrant(registration) {
      this.set('activeRegistrant', registration);
    }
  }
}
