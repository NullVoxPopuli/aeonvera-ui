import { isPresent } from '@ember/utils';
import Mixin from '@ember/object/mixin';
import DS from 'ember-data';

export default Mixin.create({
  checkedInAt: DS.attr('date'),

  isCheckedIn: function() {
    return isPresent(this.get('checkedInAt'));
  }.property('checkedInAt')
});
