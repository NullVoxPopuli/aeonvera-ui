import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';
import { computed, action } from 'ember-decorators/object';
import { alias, notEmpty, and } from 'ember-decorators/object/computed';

export default class extends Ember.Component {
  propTypes = {
    competition: PropTypes.EmberObject.isRequired,
    order: PropTypes.EmberObject.isRequired,
    addCompetition: PropTypes.any.isRequired,
    removeCompetition: PropTypes.any.isRequired,
    updateCompetition: PropTypes.any.isRequired
  };

  selectedOrientation = null;
  partnerName = '';

  @alias('order.orderLineItems') orderLineItems;
  @notEmpty('orderLineItem') isAdded;
  @and('orderLineItem.isPersisted', 'orderLineItem.isDirty') needToUpdate;

  @computed('orderLineItems.@each', 'competition')
  orderLineItem(olis, competition) {
    return olis && olis.find(o => {
      o.get('lineItem.id') == competition.id &&
      o.get('lineItem.constructor.modelName').includes('competition')
    });
  }

  @action
  addNewCompetition() {
    const competition = this.get('competition');
    const order = this.get('order');
    const partnerName = this.get('partnerName');
    const danceOrientation = this.get('selectedOrientation');
    const params = { order, partnerName, danceOrientation };

    this.sendAction('addCompetition', competition, params);
  }

}
