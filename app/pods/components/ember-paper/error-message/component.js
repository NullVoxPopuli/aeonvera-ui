import Ember from 'ember';
import { empty } from 'ember-decorators/object/computed';

import { PropTypes } from 'ember-prop-types';

import ValidationMixin from 'ember-paper/mixins/validation-mixin';

export default Ember.Component.extend(ValidationMixin, {
  propTypes: {
    errors: PropTypes.array,
    value: PropTypes.any
  },

  tagName: 'md-input-container',
  classNames: ['md-default-theme', 'md-block', 'md-input-invalid', 'no-margins'],
  validationProperty: 'value',
  @empty('errors') isEmpty: null

});
