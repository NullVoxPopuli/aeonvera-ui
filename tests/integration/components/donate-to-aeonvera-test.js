import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('donate-to-aeonvera', 'Integration | Component | donate to aeonvera', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{donate-to-aeonvera}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#donate-to-aeonvera}}
      template block text
    {{/donate-to-aeonvera}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
