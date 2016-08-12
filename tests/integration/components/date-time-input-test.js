import { moduleForComponent } from 'ember-qunit';
import { test, skip } from 'qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form/date-time-input',
  'Integration | Component | form/date-time-input', {
    integration: true
  });

skip('it renders this month when no date is set', function(assert) {
  let two = Ember.Object.extend({ someDate: null });
  this.set('two', two);
  this.render(hbs`{{form/date-time-input model=two field='someDate'}}`);

  assert.notEqual(this.$().text().indexOf('2016'), -1);
});
