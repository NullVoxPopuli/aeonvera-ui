import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';

import { alias, eq } from 'ember-decorators/object/computed';

export default class extends Ember.Component {
  static propTypes = {
    error: PropTypes.any.isRequired
  }

  @alias('model') reason;
  @alias('reason.errors') errors;;

}
