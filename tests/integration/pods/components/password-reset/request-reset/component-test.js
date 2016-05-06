import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('password-reset/request-reset', 'Integration | Component | password reset/request reset', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{password-reset/request-reset}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#password-reset/request-reset}}
      template block text
    {{/password-reset/request-reset}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
