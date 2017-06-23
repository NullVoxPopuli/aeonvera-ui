import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  propTypes: {
    didConfirm: PropTypes.func.isRequired,
    isModalShowing: PropTypes.bool
  },
  isModalShowing: false,

  actions: {
    didClickConfirm() {
      this.sendAction('didConfirm');

      this.set('isModalShowing', false);
    }
  } // end actions
});
