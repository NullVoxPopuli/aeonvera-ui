import Ember from 'ember';
import SetSidebar from 'aeonvera/mixins/routes/set-sidebar';

export default Ember.Route.extend(SetSidebar, {

  afterModel: function (model /*, transition */) {
    this._super();
    let m = model || this.get('currentModel');
    this.set('title', m.get('name'));

    Ember.run.later(() => {
      var dashboard = this.controllerFor('events/index');
      dashboard.set('data', m);

      this._setMobileLeftMenu('sidebar/event-sidebar', m);
    });
  },

  model: function (params) {
    return this.store.findRecord('event', params.event_id, {
      adapterOptions: {
        query: {
          include: 'opening_tier,integrations,sponsorships',
        },
      },
    });
  },
});
