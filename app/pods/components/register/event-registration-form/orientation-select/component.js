import Ember from 'ember';
import { computed } from 'ember-decorators/object';
import { PropTypes } from 'ember-prop-types';

export default class extends Ember.Component {
  static propTypes = {
    preciseOrientation: PropTypes.bool,
    selectedOrientation: PropTypes.string.isRequired,
    didSelectOrientation: PropTypes.func.isRequired
  };

  @computed('preciseOrientation')
  followText(precise) {
    return precise ? 'Follow' : 'Primarily Follow';
  }

  @computed('preciseOrientation')
  leadText(precise) {
    return precise ? 'Lead' : 'Primarily Lead';
  }
}
