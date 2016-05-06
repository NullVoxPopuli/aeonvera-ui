import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('password-reset/set-new-password', 'Integration | Component | password reset/set new password', {
  integration: true
});

test('shows an error on the password field', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  let errors = Ember.Object.extend({
    password: ['too short']
  });
  this.set('errors', errors);
  this.render(hbs`{{password-reset/set-new-password errors=errors}}`);

  let text = this.$().text().trim();
  let containsError = text.includes('too short');
  assert.ok(containsError);
});

test('shows an error on the password-confirmation field', function(assert) {
  let errors = Ember.Object.extend({
    password_confirmation: ['no match']
  });
  this.set('errors', errors);
  this.render(hbs`{{password-reset/set-new-password errors=errors}}`);

  let text = this.$().text().trim();
  let containsError = text.includes('no match');
  assert.ok(containsError);
});
