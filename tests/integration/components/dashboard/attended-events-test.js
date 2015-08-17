import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dashboard/attended-events', 'Integration | Component | dashboard/attended events', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dashboard/attended-events}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dashboard/attended-events}}
      template block text
    {{/dashboard/attended-events}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
