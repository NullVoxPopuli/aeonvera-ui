import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('password-reset/request-reset', 'Integration | Component | password reset/request reset', {
  integration: true
});

test('has an error on the email field', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  let model = Ember.Object.extend({
    errors: {
      email: { message: 'cannot be blank' }
    }
  });
  this.set('model', model);
  this.render(hbs`{{password-reset/request-reset model=model}}`);

  let text = this.$().text().trim();
  let containsError = text.includes('cannot be blank');
  assert.ok(containsError);
});
