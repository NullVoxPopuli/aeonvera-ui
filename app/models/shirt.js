import DS from 'ember-data';
import LineItem from '../models/line-item';

export default LineItem.extend({
  xsPrice: DS.attr('number'),
  sPrice: DS.attr('number'),
  smPrice: DS.attr('number'),
  mPrice: DS.attr('number'),
  lPrice: DS.attr('number'),
  xlPrice: DS.attr('number'),
  xxlPrice: DS.attr('number'),
  xxxlPrice: DS.attr('number')
});
