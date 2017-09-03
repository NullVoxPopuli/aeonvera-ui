import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    didAuthenticate() {
      // just in case, switching users
      this.get('store').unloadAll();

      // const attemptedTransition = this.get('session.attemptedTransition');
      //
      // const useAttemptedTransition = (
      //   attemptedTransition && !attemptedTransition.targetName.includes('login')
      // );
      //
      // if (useAttemptedTransition) return attemptedTransition.retry();
      //
      // this.transitionToRoute('dashboard');
    }
  }
});
