import Component from '@ember/component';
import { equal } from '@ember-decorators/object/computed';
import { computed, action } from '@ember-decorators/object';

export default class AskQuestion extends Component {
  classNameBindings = ['contentClass'];

  @equal('value', null) notAnswered;
  @equal('value', false) rejected;

  @computed('value')
  get contentClass() {
    const showContent = this.get('value');

    if (showContent === null || showContent === undefined) {
      return 'not-answered';
    }

    return showContent ? 'accepted': 'rejected';
  }

  @action
  reject() {
    this.sendAction('onChange', false);
  }

  @action
  confirm() {
    this.sendAction('onChange', true);
  }
};
