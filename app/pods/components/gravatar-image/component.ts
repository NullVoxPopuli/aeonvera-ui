import Component from '@ember/component';
import md5 from 'md5';

import { computed } from '@ember-decorators/object';

export default class GravatarImage extends Component {
  email: string;

  template = hbs`
    <img src="{{imgUrl}}" />
  `;

  @computed('email')
  get imgUrl() {
    const email = this.get('email');
    const hash = md5(email);
    const imageSize = 250;
    const def = ''

    return 'https://www.gravatar.com/avatar/' + hash + '?s=' + imageSize + '&d=' + def;
  }
};
