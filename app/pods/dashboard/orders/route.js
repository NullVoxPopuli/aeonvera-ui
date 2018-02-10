import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  userService: service('current-user'),

  model: function() {
    const id = this.get('userService.id');
    const query = { q: { user_id_eq: id } };

    return this.store.query('order', query);
  }
});
