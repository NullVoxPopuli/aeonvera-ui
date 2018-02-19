import Component from '@ember/component';
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import { action, computed } from '@ember-decorators/object';

import { messageFromError } from 'aeonvera/helpers/message-from-error';

export default class FormErrorDisplay extends Component {
  onHide: () => void;
  error: any;

  constructor() {
    super();

    assert('`onHide` is required', !isNone(this.onHide));
  }

  @computed('error')
  get message() {
    const error = this.get('error');

    return messageFromError(error);
  }
};
