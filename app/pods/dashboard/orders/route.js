import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  userService: Ember.inject.service('current-user'),

  model: function() {
    const id = this.get('userService.id');
    const query = { q: { user_id_eq: id } };

    return this.store.query('order', query);
  }
});
