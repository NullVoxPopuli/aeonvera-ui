import {
  moduleForComponent, test
}
from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('donate-to-aeonvera',
  'Integration | Component | donate to aeonvera', {
    integration: true
  });

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs `{{donate-to-aeonvera}}`);

  assert.notEqual(this.$().text().trim().indexOf('Donate to'), -1);
});
