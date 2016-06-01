import Ember from 'ember';
import ResetScroll from 'aeonvera/mixins/routes/reset-scroll';

export default Ember.Route.extend(ResetScroll, {

  model(params, transition) {
    return this.modelFor('register');
  }
});
