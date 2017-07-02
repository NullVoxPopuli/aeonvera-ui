import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';
import { oneWay } from 'ember-decorators/object/computed';

export default Ember.Component.extend({
  propTypes: {
    selectedLevel: PropTypes.any,
    levels: PropTypes.any,
    onlevelSelect: PropTypes.func.isRequired,
    errors: PropTypes.any
  },

  @oneWay('selectedLevel.id') selectedId: null,

  actions: {
    didChooseLevel(id) {
      this.get('levels').then(levels => {
        const selection = levels.find(p => p.get('id') === id);

        this.sendAction('onLevelSelect', selection);
      });
    }
  }
});
