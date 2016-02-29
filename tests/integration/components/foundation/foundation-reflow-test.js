import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('foundation/foundation-reflow', 'Integration | Component | foundation/foundation reflow', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{foundation/foundation-reflow}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#foundation/foundation-reflow}}
      template block text
    {{/foundation/foundation-reflow}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
