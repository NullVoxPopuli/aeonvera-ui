import Ember from 'ember';
import Index from 'aeonvera/mixins/routes/crud/events/index';

export default Ember.Route.extend(Index, {
  modelName: 'membership-renewal',
  parentIdKey: 'organization_id',
  parentPathRoot: 'my-communities.manage',
  include: 'member,membership_option',

  setupController(controller, model) {
    this._super(...arguments);

    const organization = this.modelFor('my-communities.manage.membership');
    controller.set('organization', organization);
  }
});
