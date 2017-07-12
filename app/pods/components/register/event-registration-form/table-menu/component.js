import Ember from 'ember';
import { action } from 'ember-decorators/object';

export default class extends Ember.Component {
  showModal = false;

  @action
  onCancel(menuContext) {
    this.set('showModal', true);

    Ember.set(menuContext, 'isOpen', false);
  }
}
