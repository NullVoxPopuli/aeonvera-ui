import Ember from 'ember';
import { computed } from 'ember-decorators/object';
import { mapBy } from 'ember-decorators/object/computed';


const { isPresent } = Ember;

export default class extends Ember.Component {
  @mapBy('registration.customFieldResponses', 'value') customFieldResponseValues;

  @computed('customFieldResponseValues')
  hasCustomFieldResponses(values) {
    return values.any(item => Ember.isPresent(item));
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
