import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event/edit-raffle-ticket', 'Integration | Component | event/edit raffle ticket', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{event/edit-raffle-ticket}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#event/edit-raffle-ticket}}
      template block text
    {{/event/edit-raffle-ticket}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
