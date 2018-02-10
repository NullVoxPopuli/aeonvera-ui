import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';
import { computed } from 'ember-decorators/object';

export default Component.extend({
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
