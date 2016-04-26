import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('spinner/rect-spinner', 'Integration | Component | spinner/rect spinner', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{spinner/rect-spinner}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#spinner/rect-spinner}}
      template block text
    {{/spinner/rect-spinner}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
