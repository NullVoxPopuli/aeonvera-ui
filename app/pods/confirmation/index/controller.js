import Ember from 'ember';
// import { action } from 'ember-decorators/object';
// import { service } from 'ember-decorators/service';
//
// export default class extends Ember.Controller {
//   queryParams = {
//     confirmationToken: 'confirmation_token'
//   };
//
//   @service('flash-notification') flash;
//
//   @action
//   confirmationSucceeded() {
//     this.transitionToRoute('confirmation.success');
//   }
// }

export default Ember.Controller.extend({
  queryParams: { confirmationToken: 'confirmation_token' },
  flash: Ember.inject.service('flash-notification'),

  actions: {
    confirmationSucceeded() {
      console.log('success?');
      this.transitionToRoute('confirmation.success');
    }
  }
});
