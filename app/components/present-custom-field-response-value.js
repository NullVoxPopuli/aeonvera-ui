import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  field: computed('model', function() {
    return this.get('model.customField');
  })
});
