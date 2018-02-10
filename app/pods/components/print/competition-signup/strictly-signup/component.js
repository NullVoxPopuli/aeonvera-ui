import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import RowsArray from 'aeonvera/mixins/components/print/form';

export default Component.extend(RowsArray, {
  competition: null,
  additionalRows: 0,

  orderLineItems: alias('competition.orderLineItems')
});
