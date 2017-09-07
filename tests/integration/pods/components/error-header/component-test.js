import Ember from 'ember';
import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { withChai } from 'ember-cli-chai/qunit';

import { NOT_AUTHORIZED } from 'aeonvera/pods/components/error-header/component';

moduleForComponent('error-header', 'Integration | Component | error header', {
  integration: true
});

test('starts out hidden', withChai(function(expect) {
  this.set('errors', [{ code: 401 }]);

  this.render(hbs`{{error-header errors=errors}}`);

  expect(this.$().text()).to.equal('');
}));

test('can be told to render initially', withChai(function(expect) {
  this.set('errors', [{ code: 401 }]);

  this.render(hbs`{{error-header errors=errors hidden=false}}`);

  expect(this.$().text()).to.include(NOT_AUTHORIZED);
}));

test('displays the 401 message', withChai(function(expect) {
  this.render(hbs`{{error-header errors=errors}}`);

  // something happened that caused an error
  this.set('errors', [{ code: 401 }]);

  expect(this.$().text()).to.include(NOT_AUTHORIZED);
}));

test('if no error is present, nothing is displayed', withChai(function(expect) {
  this.render(hbs`{{error-header errors=errors }}`);

  expect(this.$().text()).to.equal('');
}));

test('if there are an array of strings, the first is displayed', withChai(function(expect) {
  const error = 'I am an error. AMA';

  this.render(hbs`{{error-header errors=errors}}`);
  this.set('errors', [error]);

  expect(this.$().text()).to.include(error);
}));

test('for a json:api error, the first message for the first field is displayed', withChai(function(expect) {
  const errors = [
    {
      message: 'some error about invalid input or something',
      source: {
        pointer: 'data/attributes/field-name'
      }
    },
    {
      message: 'this one will not be displayed',
      source: {
        pointer: 'data/attributes/field-name'
      }
    }
  ];

  this.render(hbs`{{error-header errors=errors}}`);
  this.set('errors', errors);

  expect(this.$().text()).to.include(errors[0].message);
  expect(this.$().text()).to.not.include(errors[1].message);
}));

test('for a json:api error, it does not matter if the source pointer starts with a /', withChai(function(expect) {
  const errors = [
    {
      message: 'some error about invalid input or something',
      source: {
        pointer: '/data/attributes/field-name'
      }
    },
    {
      message: 'this one will not be displayed',
      source: {
        pointer: 'data/attributes/field-name'
      }
    }
  ];

  this.render(hbs`{{error-header errors=errors}}`);
  this.set('errors', errors);

  expect(this.$().text()).to.include('field name');
  expect(this.$().text()).to.not.include('/field name');
}));

test('the error can be hidden', withChai(function(expect) {
  const error = 'I am an error. AMA';

  this.render(hbs`{{error-header errors=errors}}`);
  this.set('errors', [error]);

  expect(this.$().text()).to.include(error);

  const selector = '[data-test-error-close]'
  this.$(selector).click();

  expect(this.$().text()).to.not.include(error);
}));

test('if the error is hidden, upon receiving new attributes, the error should re-display', withChai(function(expect) {
  const error = 'I am an error. AMA';

  this.render(hbs`{{error-header errors=errors}}`);
  this.set('errors', [error]);

  expect(this.$().text()).to.include(error);

  const selector = '[data-test-error-close]'
  this.$(selector).click();

  expect(this.$().text()).to.not.include(error);

  this.set('errors', ['new error!']);

  expect(this.$().text()).to.include('new error!');
}));
