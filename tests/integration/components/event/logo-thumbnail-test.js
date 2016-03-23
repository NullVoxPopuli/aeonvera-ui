import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event/logo-thumbnail', 'Integration | Component | event/logo thumbnail', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{event/logo-thumbnail}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#event/logo-thumbnail}}
      template block text
    {{/event/logo-thumbnail}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
