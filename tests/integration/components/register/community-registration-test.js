import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('register/community-registration', 'Integration | Component | register/community registration', {
  integration: true,
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{register/community-registration}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#register/community-registration}}
      template block text
    {{/register/community-registration}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
