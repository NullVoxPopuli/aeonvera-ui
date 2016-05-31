import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Route.extend({
  hostId: null,
  hostType: null,
  model() {
    let id = this.modelFor('events.show').get('id');
    let type = 'Event';
    this.set('hostId', id);
    this.set('hostType', type);

    return this.store.query('collaboration', {
      host_id: id,
      host_type: type
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('hostId', this.get('hostId'));
    controller.set('hostType', this.get('hostType'));
    controller.set('errors', this.get('errors'));
  },

  actions: {
    invite(email) {
      let collaboration = this.store.createRecord('collaboration', {
        email: email,
        host: this.modelFor('events.show')
      });

      collaboration.save().then(success => {
        this.get('flashMessages').success('invite sent');
      }, error => {
        this.set('errors', error);
        this.get('flashMessages').alert(error);
      });
    }
  }
});
