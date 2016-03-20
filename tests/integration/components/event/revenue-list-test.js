import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event/revenue-list', 'Integration | Component | event/revenue-lists', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{event/revenue-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#event/revenue-list}}
      template block text
    {{/event/revenue-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
