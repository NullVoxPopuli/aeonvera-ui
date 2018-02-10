import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),

  restraints: computed('model.restraints', function() {
    return this.get('model.restraints');
  }),

  actions: {
    addNew() {
      const newRestraint = this.get('store').createRecord('restraint');

      newRestraint.set('restrictionFor', this.get('model'));
      const restraints = this.get('restraints');

      restraints.pushObject(newRestraint);
    }
  }
});
