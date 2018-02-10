import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';

export default Component.extend({
  propTypes: {
    orderLineItem: PropTypes.EmberObject.isRequired,
    updateShirt: PropTypes.func.isRequired,
    removeShirt: PropTypes.func.isRequired
  }
});

