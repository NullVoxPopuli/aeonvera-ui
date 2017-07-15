import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';

export default class extends Ember.Component {
  static propTypes = {
    displayFee: PropTypes.bool,
    order: PropTypes.EmberObject.isRequired
  };

  tagName = 'tfoot';
}
