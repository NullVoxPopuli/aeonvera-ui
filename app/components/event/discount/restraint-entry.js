import Component from '@ember/component';

import { computed, action } from 'ember-decorators/object';

export default Component.extend({
  isEditing: false,
  kindOptions: ['Package', 'Competition'],
  selectedType: 'Package',

  @computed('selectedType')
  availableOptions(selectedType) {
    const id = this.get('eventId');

    selectedType = selectedType || 'Package';
    return this.get('store').query(selectedType, { event_id: id });
  },

  didInsertElement() {
    this._super(...arguments);

    if (this.get('restraint.isNew')) {
      this.set('isEditing', true);
    }
  },

  @action
  cancel() {
    this.set('isEditing', false);
    this.send('delete');
  },

  @action
  edit() {
    this.set('isEditing', true);
  },

  @action
  save() {
    const restraint = this.get('restraint');

    restraint.set('restrictionFor', this.get('model'));
    restraint.save().then(record => {
      this.set('isEditing', false);
    }, error => {
      // this.set('errors', error.errors);
    });
  },

  @action
  delete() {
    const restraint = this.get('restraint');

    restraint.deleteRecord();
    restraint.save().then(success => {
    }, error => {

    });

  }
});
