import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('collaboration/manage-list', 'Integration | Component | collaboration/manage list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{collaboration/manage-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#collaboration/manage-list}}
      template block text
    {{/collaboration/manage-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
