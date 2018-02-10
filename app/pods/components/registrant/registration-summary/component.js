import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { computed } from 'ember-decorators/object';
import { mapBy } from 'ember-decorators/object/computed';


export default class extends Component {
  @mapBy('registration.customFieldResponses', 'value') customFieldResponseValues;

  @computed('customFieldResponseValues')
  hasCustomFieldResponses(values) {
    return values.any(item => isPresent(item));
  }

  @computed('registration.fullName', 'registration.attendeeName', 'order.buyerName')
  name(fullName, attendeeName, buyerName) {
    return fullName || attendeeName || buyerName;
  }

  @computed('name', 'registration.danceOrientation')
  youText(name, orientation) {
    if (isPresent(orientation)) {
      return `${name} (${orientation})`;
    }

    return name;
  }
}
