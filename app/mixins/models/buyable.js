import Mixin from '@ember/object/mixin';
import DS from 'ember-data';

export default Mixin.create({
  currentPrice: DS.attr('number')
});
