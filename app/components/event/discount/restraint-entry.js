import Ember from 'ember';

export default Ember.Component.extend({
  isEditing: false,
  kindOptions: ['Package', 'Competition'],
  selecetedType: 'Package',

  availableOptions: Ember.computed('selecetedType', function(){
    let selecetedType = this.get('selecetedType');
    let id = this.get('eventId');
    selecetedType = selecetedType || 'Package';
    return this.get('store').query(selecetedType, { event_id: id });
  }),

  didInsertElement(){
    this._super(...arguments);

    if (this.get('restraint.isNew')){
      this.set('isEditing', true);
    }
  },

  actions: {
    cancel(){
      this.set('isEditing', false);
      this.send('delete');
    },
    edit(){
      this.set('isEditing', true);
    },

    save(){
      let restraint = this.get('restraint');
      restraint.set('restrictionFor', this.get('model'));
      restraint.save().then(record => {
        this.set('isEditing', false);
      }, error => {
        // this.set('errors', error.errors);
      });
    },

    delete(){
      let restraint = this.get('restraint');
      restraint.deleteRecord();
      restraint.save().then(success => {
      }, error => {

      });

    }
  }
});
