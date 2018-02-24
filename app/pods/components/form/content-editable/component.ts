import Component from '@ember/component';
import { observer } from '@ember/object';

import { computed, readonly } from '@ember-decorators/object';
import { alias, not } from '@ember-decorators/object/computed';
// import { argument } from '@ember-decorators/argument';

export default class FormContentEditable extends Component {
  tagName: string;
  placeholder: string;
  disabled = false;

  @readonly
  value: string;

  classNames = ['ember-content-editable']
  attributeBindings = ['contenteditable', 'placeholder', 'readonly', 'disabled'],

  spellcheck = false;
  clearPlaceholderOnFocus = false;
  allowNewLines = false;
  type = 'text';


  @not('disabled') contenteditable;


  valueObserver = observer('value', function() {
    console.log(this.element);
    this.element.innerHTML = this.get('value');
  })

  keyUp(e) {
    const text = e.target.outerText;

    this.sendAction('onChange', text);
  }
};
