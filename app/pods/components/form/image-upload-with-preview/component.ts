import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import { observer } from '@ember/object';

export default class FormImageUploadWithPreview extends Component {
  dataUrl: string;

  observeValue = observer('value', function() {
    const value = this.get('value');

    const reader = new FileReader();
    reader.onload = e => {
      this.set('dataUrl', e.target.result);
    }

    reader.readAsDataURL(value);
  });
};
