import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';
import { computed, action } from 'ember-decorators/object';
import { alias, notEmpty, and, oneWay } from 'ember-decorators/object/computed';

export default class extends Ember.Component {
  propTypes = {
    competition: PropTypes.EmberObject.isRequired,
    order: PropTypes.EmberObject.isRequired,
    addCompetition: PropTypes.any.isRequired,
    removeCompetition: PropTypes.any.isRequired,
    updateCompetition: PropTypes.any.isRequired
  };

  // define setters on these that DO set on the orderdLineItem
  @oneWay('orderLineItem.danceOrientation') selectedOrientation;
  @oneWay('orderLineItem.partnerName') partnerName;

  @oneWay('order.orderLineItems') orderLineItems;
  @oneWay('orderLineItem.isPersisted') isAdded;
  @and('isAdded', 'orderLineItem.isDirty') needToUpdate;

  @computed('orderLineItems.@each', 'competition')
  orderLineItem(olis, competition) {
    return olis &&
      olis.find(o => o.get('lineItem.id') == competition.id &&
                     o.get('lineItem.constructor.modelName').includes('competition'));
  }

  @action
  removeExistingCompetition() {
    const orderLineItem = this.get('orderLineItem');

    this.sendAction('removeCompetition', orderLineItem);
  }

  @action
  updateExistingCompetition() {
    const orderLineItem = this.get('orderLineItem');
    const partnerName = this.get('partnerName');
    const danceOrientation = this.get('selectedOrientation');
    const params = { partnerName, danceOrientation };

    this.sendAction('updateCompetition', orderLineItem, params);
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
