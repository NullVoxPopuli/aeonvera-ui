import { moduleForComponent } from 'ember-qunit';
import { test, skip } from 'qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('password-edit', 'Integration | Component | password edit', {
  integration: true
});

skip('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{password-edit}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#password-edit}}
      template block text
    {{/password-edit}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
