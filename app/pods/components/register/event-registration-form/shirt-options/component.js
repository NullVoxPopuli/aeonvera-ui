import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';
import { map, alias } from 'ember-computed-decorators';

export default Ember.Component.extend({
  propTypes: {
    order: PropTypes.EmberObject.isRequired,
    shirts: PropTypes.any.isRequired,
    addShirt: PropTypes.func.isRequired,
    removeShirt: PropTypes.func.isRequired,
    updateShirt: PropTypes.func.isRequired
  }
});
