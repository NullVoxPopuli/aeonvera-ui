import Ember from 'ember';
import Index from 'aeonvera/mixins/routes/crud/events/index';
import ENV from 'aeonvera/config/environment';

export default Ember.Route.extend(Index, {
  modelName: 'discount',

  downloadURL: Ember.computed(function(){
    return ENV.host + '/api/discounts.csv';
  }),
});
