import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('error-field-wrapper',
  'Integration | Component | error-field-wrapper', {
    integration: true
  });

test('it renders with no error', function(assert) {
  this.set('errors', {});
  this.render(hbs`
    {{#error-field-wrapper errors=errors field='someField'}}
      <label>
        <span>Some Field</span>
        {{input type='text' value=someValue}}
      </label>
    {{/error-field-wrapper}}
  `);

  let result = Ember.isPresent(this.$().find('.no-error'));
  assert.ok(result);
});

test('it renders with an error', function(assert) {
  this.set('errors', {
    someField: {
      message: 'wut'
    }
  });

  this.render(hbs`
    {{#error-field-wrapper errors=errors field='someField'}}
      <label>
        <span>Some Field</span>
        {{input type='text' value=someValue}}
      </label>
    {{/error-field-wrapper}}
  `);

  let error = this.$().find('.error');
  let result = Ember.isPresent(error);
  assert.ok(result);

  assert.notEqual(error.text().indexOf('wut'), -1);
});
