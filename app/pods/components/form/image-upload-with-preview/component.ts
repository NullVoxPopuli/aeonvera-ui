import Component from '@ember/component';
import { computed, action } from '@ember-decorators/object';
import { observer } from '@ember/object';

export default class FormImageUploadWithPreview extends Component {
  dataUrl: string;

  // observeValue = observer('value', function() {
  //
  // });

  @action
  fileSelected(e) {
    // const value = this.get('value');

    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.set('dataUrl', e.target.result);
      }

      reader.readAsDataURL(file);
      this.sendAction('onChange', file);
    }
  }
};
