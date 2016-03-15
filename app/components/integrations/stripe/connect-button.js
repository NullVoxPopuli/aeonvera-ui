import Ember from 'ember';
import env from 'aeonvera/config/environment';

export default Ember.Component.extend({
  actions: {
    createIntegration(){
      let to = this.get('to');
      this.get('store').createRecord('integration',{
        owner_id: to.get('id'),
        owner_type: to.get('payable_type')
      });
    }
  }
});
