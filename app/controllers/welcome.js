import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],

  application: Ember.computed.alias("controllers.application"),

  actions: {


  }


});
