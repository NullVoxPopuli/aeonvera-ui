import Ember from 'ember';

const { computed, isPresent } = Ember;

export default Ember.Component.extend({
  customFieldResponseValues: Ember.computed.mapBy('attendance.customFieldResponses', 'value'),

  hasCustomFieldResponses: computed('customFieldResponseValues', function() {
    let values = this.get('customFieldResponseValues');
    return values.any(item => Ember.isPresent(item));
  }),

  name: computed('attendance.attendeeName', 'order.buyerName', function() {
    return this.get('attendance.attendeeName') || this.get('order.userName');
  }),

  youText: computed('name', 'attendance.danceOrientation', function(){
    const name = this.get('name');
    const orientation = this.get('attendance.danceOrientation');

    if (isPresent(orientation)) {
      return `${name} (${orientation})`;
    }

    return name;
  })
});
