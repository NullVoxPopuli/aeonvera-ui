import Ember from 'ember';

export default Ember.Component.extend({
  customFieldResponseValues: Ember.computed.mapBy('attendance.customFieldResponses', 'value'),

  hasCustomFieldResponses: Ember.computed('customFieldResponseValues', function() {
    let values = this.get('customFieldResponseValues');
    return values.any(item => Ember.isPresent(item));
  }),
});
