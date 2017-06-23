import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';
import { oneWay } from 'ember-computed-decorators';

export default Ember.Component.extend({
  propTypes: {
    selectedLevel: PropTypes.any,
    levels: PropTypes.any,
    onlevelSelect: PropTypes.func.isRequired,
    errors: PropTypes.any
  },

  @oneWay('selectedLevel.id') selectedId,

  actions: {
    didChooseLevel(id) {
      this.get('levels').then(levels => {
        const selection = levels.find(p => p.get('id') === id);

        this.set('selectedLevel', selection);
        this.sendAction('onLevelSelect', selection);
      });
    }
  }
});
