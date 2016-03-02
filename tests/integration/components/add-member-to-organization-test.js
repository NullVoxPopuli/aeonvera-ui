import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('add-member-to-organization', 'Integration | Component | add member to organization', {
  integration: true,
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{add-member-to-organization}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#add-member-to-organization}}
      template block text
    {{/add-member-to-organization}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});