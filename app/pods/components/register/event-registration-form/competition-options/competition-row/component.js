import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';
import { computed } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

export default class extends Ember.Component {
  propTypes = {
    competition: PropTypes.EmberObject.isRequired,
    order: PropTypes.EmberObject.isRequired,
    addCompetition: PropTypes.any.isRequired,
    removeCompetition: PropTypes.any.isRequired,
    updateCompetition: PropTypes.any.isRequired
  };


  @alias('order.orderLineItems') orderLineItems;

  @computed('orderLineItems.@each', 'competition')
  orderLineItem(items, competition) {

  }

}
