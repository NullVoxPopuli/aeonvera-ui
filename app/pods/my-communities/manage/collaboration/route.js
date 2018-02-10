import Route from '@ember/routing/route';

export default Route.extend({
  hostId: null,
  hostType: null,

  model() {
    const id = this.modelFor('my-communities.manage').get('id');
    const type = 'Organization';

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
      this.store.findRecord('organization', this.get('hostId')).then(org => {
        const collaboration = this.store.createRecord('collaboration', {
          email: email,
          host: org
        });

        collaboration.save().then(success => {
          this.get('flashMessages').success('invite sent');
        }, error => {
          this.set('errors', error);
          this.get('flashMessages').alert(error);
        });
      });
    }
  }
});
