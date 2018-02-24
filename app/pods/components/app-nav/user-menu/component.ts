import Component from '@ember/component';

// import { inject as service } from '@ember/service';

import { service } from '@ember-decorators/service';
import { alias } from '@ember/object/computed';


export default class AppNavUserMenu extends Component {
  @service('session') session;

  @alias('session.currentUser') currentUser;
};
