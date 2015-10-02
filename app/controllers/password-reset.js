import Ember from 'ember';

export default Ember.Controller.extend({
  email: null,

  errors: function(){
    let model = this.get('model');

    if (Ember.isPresent(model)){
      return model.get('errors');
    }

    return [];
  }.property('model')
});
