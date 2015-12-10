import {
  moduleForComponent, test
}
from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('date-time-input',
  'Integration | Component | date-time-input', {
    integration: true
  });


test('Creates the text fields', function(assert) {
  var timeAsString =
    'Thu Dec 10 2015 09:24:21 GMT-0500 (Eastern Standard Time)';
  this.set('time', timeAsString);

  this.render(hbs `
    {{date-time-input value=time}}
  `);

  var fields = this.$('.row input');
  assert.equal(fields.length, 2);

  var expectedDate = '2015-12-10'; //moment(this.get('time'), 'YYYY-MM-DD');
  var expectedTime = '09:24:21'; //moment(this.get('time'), 'HH:mm:ss');
  var actualDate = $(fields[0]).val();
  var actualTime = $(fields[1]).val();

  assert.equal(actualDate, expectedDate);
  assert.equal(actualTime, expectedTime);
});
