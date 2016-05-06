import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('password-reset/set-new-password', 'Integration | Component | password reset/set new password', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{password-reset/set-new-password}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#password-reset/set-new-password}}
      template block text
    {{/password-reset/set-new-password}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
