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

skip('for a json:api error, the first message for the first field is displayed', withChai(expect => {

}));

skip('for a json:api error, if the field is base, only the reason is displayed', withChai(expect => {

}));

skip('for a json:api error, the message is displayed', withChai(expect => {

}));

skip('for a json:api error, the detail is displayed', withChai(expect => {

}));

skip('the error can be hidden', withChai(expect => {

}));

skip('if the error is hidden, upon receiving new attributes, the error should re-display', withChai(expect => {

}));
