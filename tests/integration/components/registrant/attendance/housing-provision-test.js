import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('registrant/attendance-summary/housing-provision', 'Integration | Component | registrant/attendance/housing provision', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{registrant/attendance/housing-provision}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#registrant/attendance/housing-provision}}
      template block text
    {{/registrant/attendance/housing-provision}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
