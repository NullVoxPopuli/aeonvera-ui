import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('confirmation/index', 'Integration | Component | confirmation/index', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{confirmation/index}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#confirmation/index}}
      template block text
    {{/confirmation/index}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
