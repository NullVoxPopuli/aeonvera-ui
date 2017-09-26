import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';

import { action } from 'ember-decorators/object';

export default class extends Component {
  // tagName = '';
  raised = true;

  @action
  closeModal() {
    this.set('showModal', false);
  }

  @action
  onClick() {
    const onClick = this.get('onClick');

    if (onClick) {
      let result = this.sendAction('onClick');

      if (result === undefined) return;
    }

    this.set('showModal', true);
  }
}
