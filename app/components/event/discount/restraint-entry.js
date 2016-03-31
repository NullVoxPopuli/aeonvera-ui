import Ember from 'ember';

export default Ember.Component.extend({
  isEditing: false,

  didInsertElement(){
    this._super(...arguments);

    if (this.get('restraint.isNew')){
      this.set('isEditing', true);
    }
  },

  actions: {
    edit(){
      this.set('isEditing', true);
    },
    save(){

    },

    delete(){

    }
  }
});
