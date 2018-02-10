import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import env from 'aeonvera/config/environment';

moduleForComponent('integrations/stripe/disconnect-button', 'Integration | Component | integrations/stripe/disconnect button', {
  integration: true
});

test('it renders', function(assert) {
  let o = EmberObject.create({ id: 1, payableType: 'Test' });
  this.set('o', o);

  this.render(hbs`{{integrations/stripe/disconnect-button to=o}}`);

  let expected = 'Remove Connection With Stripe';
  let actual = this.$('button').text().trim();
  assert.equal(actual, expected);
});
