import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';

export default class extends Component {
  static propTypes = {
    displayFee: PropTypes.bool,
    order: PropTypes.EmberObject.isRequired
  };

  tagName = 'tfoot';
}
