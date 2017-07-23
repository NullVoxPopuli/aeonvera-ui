import Ember from 'ember';
import ENV from 'aeonvera/config/environment';

export default Ember.Route.extend({
  flash: Ember.inject.service('flash-notification'),
  hostId: null,
  hostType: null,

  model() {
    const id = this.modelFor('events.show').get('id');
    const type = 'Event';

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
      const collaboration = this.store.createRecord('collaboration', {
        email: email,
        host: this.modelFor('events.show')
      });

      collaboration.save().then(success => {
        this.get('flash').success('invite sent');
      }, error => {
        this.set('errors', error);
        this.get('flash').alert(error);
      });
    }
  }
});
