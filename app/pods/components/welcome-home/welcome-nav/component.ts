import Component from '@ember/component';

import { inject as service } from '@ember/service';

export default class WelcomeNav extends Component {
  session = service('session');
}
