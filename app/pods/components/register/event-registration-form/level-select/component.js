import Component from '@ember/component';
import RSVP from 'rsvp';
import { PropTypes } from 'ember-prop-types';
import { oneWay } from 'ember-decorators/object/computed';

export default Component.extend({
  propTypes: {
    selectedLevel: PropTypes.any,
    levels: PropTypes.any,
    onLevelSelect: PropTypes.func.isRequired,
    errors: PropTypes.any
  },

  @oneWay('selectedLevel.id') selectedId: null,

  actions: {
    didChooseLevel(id) {
      RSVP.resolve(this.get('levels')).then(levels => {
        const selection = levels.find(p => id && p.get('id') && p.get('id') === id);

        this.sendAction('onLevelSelect', selection);
      });
    }
  }
});
