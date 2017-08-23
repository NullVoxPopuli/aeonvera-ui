import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';

import { alias } from 'ember-decorators/object/computed';
import { service } from 'ember-decorators/service';

import { timeout } from 'ember-concurrency';
import { restartableTask } from 'ember-concurrency-decorators';

const DEBOUNCE_MS = 500;

const { isBlank } = Ember;

export default class extends Ember.Component {
  static propTypes = {
    event: PropTypes.EmberObject.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
  };

  // @service('store') store;
  @alias('searchRegistrants.lastSuccessful.value') registrants;

  @restartableTask
  searchRegistrants = function * (term) {
    if (isBlank(term)) return;
    yield timeout(DEBOUNCE_MS);

    const result = this.get('store')
      .query('events/registration', {
        ['event_id']: this.get('event.id'),
        q: {
          ['attendee_full_name_cont']: term
        }
      });

    return result;
  }
}
