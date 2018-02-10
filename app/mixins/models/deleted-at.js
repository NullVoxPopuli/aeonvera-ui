import { isPresent } from '@ember/utils';
import Mixin from '@ember/object/mixin';
import DS from 'ember-data';

export default Mixin.create({
  deletedAt: DS.attr('date'),

  isDeleted: function() {
    return isPresent(this.get('deletedAt'));
  }.property('deletedAt')
});
