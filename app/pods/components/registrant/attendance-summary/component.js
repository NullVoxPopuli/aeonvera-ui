import Ember from 'ember';
import computed, { mapBy } from 'ember-computed-decorators';

const { isPresent } = Ember;

export default class extends Ember.Component {
  @mapBy('attendance.customFieldResponses', 'value') customFieldResponseValues

  @computed('customFieldResponseValues')
  hasCustomFieldResponses(values) {
    return values.any(item => Ember.isPresent(item));
  }

  @computed('attendance.fullName', 'attendance.attendeeName', 'order.buyerName')
  name(fullName, attendeeName, buyerName) {
    return fullName || attendeeName || buyerName;
  }

  @computed('name', 'attendance.danceOrientation')
  youText(name, orientation) {
    if (isPresent(orientation)) {
      return `${name} (${orientation})`;
    }

    return name;
  }
}
