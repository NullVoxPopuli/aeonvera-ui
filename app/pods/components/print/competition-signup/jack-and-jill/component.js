import Ember from 'ember';
import RowsArray from 'aeonvera/mixins/components/print/form';

const {computed} = Ember;

export default Ember.Component.extend(RowsArray, {
  competition: null,
  additionalRows: 0,

  orderLineItems: computed.alias('competition.orderLineItems'),
  leads: computed.filterBy('orderLineItems', 'danceOrientation', 'Lead'),
  follows: computed.filterBy('orderLineItems', 'danceOrientation', 'Follow'),

  numberOfLeads: computed.alias('leads.length'),
  numberOfFollows: computed.alias('follows.length')
});
