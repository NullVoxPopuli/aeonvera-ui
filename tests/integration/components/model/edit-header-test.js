import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('model/edit-header', 'Integration | Component | model/edit header', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{model/edit-header}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#model/edit-header}}
      template block text
    {{/model/edit-header}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
