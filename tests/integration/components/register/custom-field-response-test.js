import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('register/custom-field-response', 'Integration | Component | register/custom field response', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{register/custom-field-response}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#register/custom-field-response}}
      template block text
    {{/register/custom-field-response}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
