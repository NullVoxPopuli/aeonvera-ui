import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';

export default class extends Component {
  static propTypes = {
    order: PropTypes.EmberObject.isRequired,
    showOrder: PropTypes.bool,
    afterPayment: PropTypes.func
  };

  showOrder = false;
}
