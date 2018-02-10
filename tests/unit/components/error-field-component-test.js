import { withChai } from 'ember-cli-chai/qunit';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('error-field-wrapper', 'Unit | Component | error-field-wrapper');

test('it has errors for a field with of an error array', withChai(function(expect) {
  let component = this.subject();
  let expected = 'an error!';

  component.set('field', 'aField');
  component.set('errors', {
    aField: [expected]
  });

  let hasError = component.get('hasError');

  expect(hasError).to.equal(true);

  let errors = component.get('fieldErrors');

  expect(errors[0].message).to.equal(expected);
}));

test('it has an error with only a single error', withChai(function(expect) {
  let component = this.subject();
  let expected = 'an error!';

  component.set('field', 'aField');
  component.set('errors', {
    aField: { message: expected }
  });

  let hasError = component.get('hasError');

  expect(hasError).to.equal(true);

  let errors = component.get('fieldErrors');

  expect(errors[0].message).to.equal(expected);
}));
