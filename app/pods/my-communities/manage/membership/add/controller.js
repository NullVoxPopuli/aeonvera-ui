import Ember from 'ember';
import { alias } from 'ember-computed-decorators';
import { task, timeout } from 'ember-concurrency';

const DEBOUNCE_MS = 1000;

const { isBlank } = Ember;

export default Ember.Controller.extend({
  flash: Ember.inject.service('flash-notification'),

  @alias('model.membership') membership,
  @alias('model.organization') organization,

  searchUsers: task(function * (term) {
    if (isBlank(term)) return;
    yield timeout(DEBOUNCE_MS);

    const result = this.get('store').query('member', {
      all: true,
      q: {
        full_name_cont: term
      }
    });


    return result;
  }).restartable(),

  @alias('searchUsers.lastSuccessful.value') potentialMembers,

  actions: {
    saveMembership() {
      const membership = this.get('membership');
      const flash = this.get('flash');

      membership.save().then(() => {
        this.transitionToRoute('my-communities.manage.membership');
        flash.success('Membership created');
      }).catch(() => {
        flash.alert('Membership could not be created');
      });
    }
  } // end actions
});
