import Ember from 'ember';

import { computed, action } from 'ember-decorators/object';
import { sort, alias } from 'ember-decorators/object/computed';

export default class extends Ember.Component {
  queryText = '';
  showOnlyNonCheckedIn = false;
  showOnlyThoseWhoOweMoney = false;

  activeRegistrant = null;

  limit = 5;

  @alias('registrations.length') numberOfRegistrations;

  @computed('numberOfRegistrations', 'limit')
  numberOfPages(num, limit) {
    return num / limit;
  }

  @computed('numberOfPages')
  pages(num) {
    let result = [];

    for (let i = 0; i < num; i++) {
      result.push(i + 1);
    }

    return result;
  }
  // pages = Ember.A([1, 2, 3]);
  limitOptions = Ember.A([10, 20, 30]);
  page = 1;
  sortProp = 'name';
  sortDir = 'asc';

  @computed('sortProp', 'sortDir')
  sortProperty(prop, dir) {
    return [`${prop}:${dir}`];
  }

  @computed('sortedRegistrations', 'page', 'limit')
  paginatedRegistrations(registrations, page, limit) {
    let ind = (page - 1) * limit;

    return Ember.A(registrations.toArray().splice(ind, limit));
  }

  @sort('registrations', 'sortProperty') sortedRegistrations;

  @action
  decrementPage() {
    let page = this.get('page');
    if (page > 0) {
      this.set('page',page-1);
    }
  }

  @action
  changeSort(args) {
    console.log(args, ...arguments);
  }

  @action
  incrementPage() {
    let page =  this.get('page');
    let max = this.get('pages').reduce((prev,curr) => curr > prev ? curr : prev,0);
    if (page < max) {
      this.set('page',page+1);
    }
  }

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

  @action
  setActiveRegistrant(registration) {
    this.set('activeRegistrant', registration);
  }

  @action
  loadNext() {
    this.get('pagedRegistrations').loadNextPage();
  }

}
