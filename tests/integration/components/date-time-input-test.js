import {
  moduleForComponent, test
}
from 'ember-qunit';

import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('date-time-input',
  'Integration | Component | date-time-input', {
    integration: true
  });

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  let two = Ember.Object.extend({
    someDate: null
  });
  this.set('two', two);
  this.render(hbs `{{date-time-input model=two field='someDate'}}`);

  assert.notEqual(this.$().text().indexOf('2016'), -1);
});
