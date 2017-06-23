import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';

export default Ember.Component.extend({
  propTypes: {
    orderLineItem: PropTypes.EmberObject.isRequired,
    updateShirt: PropTypes.func.isRequired,
    removeShirt: PropTypes.func.isRequired
  }
});

