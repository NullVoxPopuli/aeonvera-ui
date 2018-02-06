export function initialize(instance) {
  const applicationRoute = instance.lookup('route:application');
  const session          = instance.lookup('service:session');

  session.on('authenticationSucceeded', function() {
    const attemptedTransition = session.get('attemptedTransition');

    const useAttemptedTransition = (
      attemptedTransition && !attemptedTransition.targetName.includes('login')
    );

    if (useAttemptedTransition) return attemptedTransition.retry();

    applicationRoute.transitionTo('dashboard');
  });

  session.on('invalidationSucceeded', function() {
    applicationRoute.transitionTo('welcome');
  });
}

export default {
  initialize,
  name:  'session-events',
  after: 'ember-simple-auth'
};
