import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';
import { equal } from 'ember-computed-decorators';

const DOES_NOT_NEED_HOUSING = 0;
const CAN_PROVIDE_HOUSING = 1;
const REQUESTING_HOUSING = 2;

export default Ember.Component.extend({
  propTypes: {
    selectedHousingOption: PropTypes.number,
    housingProvision: PropTypes.EmberObject,
    housingRequest: PropTypes.EmberObject,
    logoUrl: PropTypes.string,
    onChangeSelection: PropTypes.func.isRequired,
    onSubmitHousing: PropTypes.func.isRequired
  },

  @equal('selectedHousingOption', DOES_NOT_NEED_HOUSING) doesNotNeedHousing: null,
  @equal('selectedHousingOption', CAN_PROVIDE_HOUSING) canProvideHousing: null,
  @equal('selectedHousingOption', REQUESTING_HOUSING) isRequestingHousing: null,

  actions: {
    setHousingOption(value) {
      // hack to get around the controller not passing us
      // the updated value...
      // this.set('selectedHousingOption', value);
      this.sendAction('onChangeSelection', value);
    }
  }
});
