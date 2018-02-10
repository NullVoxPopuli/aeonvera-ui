import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';
import { map, alias } from 'ember-decorators/object/computed';

export default Component.extend({
  propTypes: {
    order: PropTypes.EmberObject.isRequired,
    shirts: PropTypes.any.isRequired,
    addShirt: PropTypes.func.isRequired,
    removeShirt: PropTypes.func.isRequired,
    updateShirt: PropTypes.func.isRequired
  }
});
