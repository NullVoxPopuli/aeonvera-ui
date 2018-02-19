import Component from '@ember/component';
import md5 from 'md5';

import { computed } from '@ember-decorators/object';

export default class GravatarImage extends Component {
  email: string;
  tagName = 'img';
  attributeBindings = ['src', 'size:height', 'size:width'];
  imageSize = 250;

  @computed('email', 'size')
  get src() {
    const email = this.get('email');
    const imageSize = this.get('imageSize');

    const hash = md5(email);
    const def = ''

    return 'https://www.gravatar.com/avatar/' + hash + '?s=' + imageSize + '&d=' + def;
  }
};
