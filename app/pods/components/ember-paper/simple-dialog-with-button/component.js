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
  async onClick() {
    const onClick = this.get('onClick');

    if (onClick) {
      try {
        const result = await onClick();
        console.log('onClick: ', result);
        if (!result) return;

        this.set('showModal', true);
      } catch(e) { console.error(e); }
    } else {
      this.set('showModal', true);
    }

  }
}
