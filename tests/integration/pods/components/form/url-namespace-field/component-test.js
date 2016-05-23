import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form/url-namespace-field', 'Integration | Component | form/url namespace field', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{form/url-namespace-field}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#form/url-namespace-field}}
      template block text
    {{/form/url-namespace-field}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
