import Ember from 'ember';
import { alias } from 'ember-decorators/object/computed';
import { task, timeout } from 'ember-concurrency';

const DEBOUNCE_MS = 1000;

const { isBlank } = Ember;

export default class extends Ember.Controller {
  @alias('model.organization') organization;
  @alias('model.memberships') memberships;
  // @alias('searchMemberships.lastSuccessful.value') memberships;

  // TODO: for later
  //       currently, local filtering / searching is fine
  // searchMemberships = task(function * (query) {
  //   if (isBlank(query)) return;
  //   yield timeout(DEBOUNCE_MS);
  //
  // }).restartable()

}
