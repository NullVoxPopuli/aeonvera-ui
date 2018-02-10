import Component from '@ember/component';
import { set } from '@ember/object';
import { action } from 'ember-decorators/object';

export default class extends Component {
  showModal = false;

  @action
  onCancel(menuContext) {
    this.set('showModal', true);

    set(menuContext, 'isOpen', false);
  }
}
