import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sidebar/community-sidebar', 'Integration | Component | sidebar/community sidebar', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sidebar/community-sidebar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sidebar/community-sidebar}}
      template block text
    {{/sidebar/community-sidebar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
