import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function () {
    this.render('my-communities/manage', {
      into: 'application',
    });
  },

  afterModel: function (model /*, transition */) {
    this._super();
    this.set('title', model.get('name'));

    Ember.run.later(() => {
      var dashboard = this.controllerFor('my-communities/manage');
      dashboard.set('data', model);
    });
  },

  model: function (params) {
    let id = params.organization_id;
    return this.store.findRecord('organization-summary', id, {
      adapterOptions: {
        query: {
          include: 'attendances',
        },
      },
    });
  },
});
