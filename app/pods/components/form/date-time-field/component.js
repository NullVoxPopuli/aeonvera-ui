import Component from '@ember/component';

export default Component.extend({
  defaultValue: null,
  selectedDate: null,
  enableTime: true,
  dateFormat: 'F j, Y at',
  timeFormat: 'h:i K',
  timeOnly: false
});
