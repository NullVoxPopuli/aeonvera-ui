import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event/discount/restraint-entry', 'Integration | Component | event/discount/restraint entry', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{event/discount/restraint-entry}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#event/discount/restraint-entry}}
      template block text
    {{/event/discount/restraint-entry}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
