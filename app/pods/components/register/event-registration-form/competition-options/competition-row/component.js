import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { PropTypes } from 'ember-prop-types';
import { computed, action } from 'ember-decorators/object';
import { alias, notEmpty, not, and, oneWay } from 'ember-decorators/object/computed';

export default class extends Component {
  propTypes = {
    competition: PropTypes.EmberObject.isRequired,
    order: PropTypes.EmberObject.isRequired,
    addCompetition: PropTypes.any.isRequired,
    removeCompetition: PropTypes.any.isRequired,
    updateCompetition: PropTypes.any.isRequired
  };

  @computed('orderLineItem.danceOrientation')
  selectedOrientation = {
    get(selectedOrientation) {
      return selectedOrientation;
    },

    set(value, selectedOrientation) {
      const oli = this.get('orderLineItem');

      if (isPresent(oli)) {
        oli.set('danceOrientation', value);
      }

      return value;
    }
  }

  @computed('orderLineItem.partnerName')
  partnerName = {
    get(partnerName) {
      return partnerName;
    },

    set(value) {
      const oli = this.get('orderLineItem');

      if (isPresent(oli)) {
        oli.set('partnerName', value);
      }

      return value;
    }
  }


  @oneWay('order.orderLineItems') orderLineItems;
  @and('orderLineItem.id', 'orderLineItem.isPersisted') isAdded;
  @and('orderLineItem.id', 'isAdded', 'orderLineItem.hasDirtyAttributes') needToUpdate;

  @computed('order.orderLineItems.@each.{id,lineItem}', 'competition')
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
