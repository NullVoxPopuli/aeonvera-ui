import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';

export default Component.extend({
  propTypes: {
    model: PropTypes.EmberObject.isRequired
  }
});
