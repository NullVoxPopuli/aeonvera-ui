import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import env from 'aeonvera/config/environment';

moduleForComponent('integrations/stripe/connect-button',
'Integration | Component | integrations/stripe/connect button', {
  integration: true
});

test('it renders', function(assert) {
  let model = EmberObject.create({ id: 1, payableType: 'Test' });
  this.set('model', model);

  this.render(hbs`{{integrations/stripe/connect-button to=model}}`);

  let expected = 'Connect With Stripe';
  let actual = this.$('button').text().trim();
  assert.equal(actual, expected);
});
