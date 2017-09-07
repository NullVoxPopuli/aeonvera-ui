import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';

export default class extends Ember.Component {
  static propTypes = {
    order: PropTypes.EmberObject.isRequired,
    showOrder: PropTypes.bool,
    afterPayment: PropTypes.func
  };

  showOrder = false;
}
