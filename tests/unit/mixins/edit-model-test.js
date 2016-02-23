import Ember from 'ember';
import EditModelMixin from '../../../mixins/edit-model';
import { module, test } from 'qunit';

module('Unit | Mixin | edit model');

// Replace this with your real tests.
test('it works', function(assert) {
  var EditModelObject = Ember.Object.extend(EditModelMixin);
  var subject = EditModelObject.create();
  assert.ok(subject);
});
