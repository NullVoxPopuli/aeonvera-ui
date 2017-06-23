import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('organizations/title-with-logo', 'Integration | Component | organizations/title with logo', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{organizations/title-with-logo}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#organizations/title-with-logo}}
      template block text
    {{/organizations/title-with-logo}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
