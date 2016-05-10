import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('error-field-wrapper', 'Unit | Component | error-field-wrapper');

test('it has errors for a field with of an error array', function() {
  let component = this.subject();
  let expected = 'an error!';

  component.set('field', 'aField');
  component.set('errors', {
    aField: [expected]
  });

  let hasError = component.get('hasError');
  ok(hasError);

  let errors = component.get('fieldErrors');
  equal(errors[0].message, expected);
});

test('it has an error with only a single error', function() {
  let component = this.subject();
  let expected = 'an error!';

  component.set('field', 'aField');
  component.set('errors', {
    aField: { message: expected }
  });

  let hasError = component.get('hasError');
  ok(hasError);

  let errors = component.get('fieldErrors');
  equal(errors[0].message, expected);
});
