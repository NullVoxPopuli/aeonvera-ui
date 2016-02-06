import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('my-communities/manage', {
      into: 'application'
    });
  },

  afterModel: function(model /*, transition */ ) {
    this._super();

    this.set('title', model.get('name'));

    var self = this;
    Ember.run.later(function() {
      var dashboard = self.controllerFor('my-communities/manage');
      dashboard.set('data', model);
    });
  },

  model: function(params) {
    let id = params.organization_id;
    return this.store.findRecord('organization-summary', id, {
      adapterOptions: {
        query: {
          'include': 'attendances'
        }
      }
    });
  }
});
