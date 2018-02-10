import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';

import { action } from 'ember-decorators/object';

export default class extends Component {
  // tagName = '';
  raised = true;
  onClick = null;

  @action
  closeModal() {
    this.set('showModal', false);
  }

  @action
  async doClick() {
    const { onClick } = this;

    if (onClick) {
      try {
        const result = await onClick();
        if (!result) return;

        this.set('showModal', true);
      } catch(e) { console.error(e); }
    } else {
      this.set('showModal', true);
    }

  }
}
