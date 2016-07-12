import Ember from 'ember';
import SetSidebar from 'aeonvera/mixins/routes/set-sidebar';

export default Ember.Route.extend(SetSidebar, {
  renderTemplate: function () {
    this.render('my-communities/manage', {
      into: 'application',
    });
  },

  afterModel: function (model /*, transition */) {
    this._super();
    Ember.run.later(() => {
      this.set('title', model.get('name'));
      var dashboard = this.controllerFor('my-communities/manage');
      dashboard.set('data', model);

      this._setMobileLeftMenu('sidebar/community-sidebar', model);
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
