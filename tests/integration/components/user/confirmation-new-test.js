import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user/confirmation-new', 'Integration | Component | user/confirmation new', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{user/confirmation-new}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#user/confirmation-new}}
      template block text
    {{/user/confirmation-new}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
