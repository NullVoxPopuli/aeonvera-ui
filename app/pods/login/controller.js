import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service(),

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
