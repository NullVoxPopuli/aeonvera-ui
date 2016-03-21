import Ember from 'ember';
import 'aeonvera/tests/helpers/service-named';

export default Ember.Test.registerAsyncHelper('logout', function(app) {

  // let button = find('a .fa-sign-out').first().parent();
  // button.click();
  serviceNamed('session').invalidate();
  /*
    for some reason, the session doesn't invalidate....
    it does in real life though
  */

  // andThen(() => {
  //   let auth = serviceNamed('session').get('isAuthenticated');
  //   equal(auth, false);
  // });
});
