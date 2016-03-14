import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import env from 'aeonvera/config/environment';

moduleForComponent('integrations/stripe/connect-button',
'Integration | Component | integrations/stripe/connect button', {
  integration: true
});

test('it renders', function(assert) {
  let o = Ember.Object.extend({ id: 1, payableType: 'Test' });
  this.set('o', o);

  this.render(hbs`{{integrations/stripe/connect-button model=o}}`);

  let expected = `${env.APP.host}/oauth/stripe/new?payable_id=1&payable_type=Test`;
  assert.equal(this.get('href'), expected);
});
