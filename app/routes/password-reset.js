import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  activate: function(){
    Ember.$('a.close-reveal-modal').trigger('click');
  },

  modelUpdate: function(){
    let controller = this.controllerFor('password-reset');
    controller.set('model', this.get('model'));
  }.observes('model'),

  actions: {
    reset: function(){
      let self = this;
      let url = ENV.host + '/api/users/password.json';
      let controller = this.controllerFor('password-reset')
      let data = {
        user: {
          email: controller.get('email')
        }
      };

      Ember.$.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function (data) {
          self.set('model', data);
        },
        error: function (jqxhr, status, text) {
          let json = Ember.$.parseJSON(jqxhr.responseText);
          // object -> array -> objcets
          for (var key in json){

          }
          let errors = Ember.Object.create(json);
          self.set('model', errors);
        }
      });
    }
  }
});
