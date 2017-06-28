import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('lesson', 'Integration | Mixin | Comparison', {
  integration: true,
  beforeEach() {
    this.inject.service('store');
  }
});

test('isTheSameKindAs | is true with same object', function(assert) {
  Ember.run(() => {
    let lesson = this.store.createRecord('lesson');
    let result = lesson.isTheSameKindAs(lesson);

    assert.ok(result);
  });
});

test('isTheSameKindAs | is false with objects of different type', function(assert) {
  Ember.run(() => {
    let lesson = this.store.createRecord('lesson');
    let discount = this.store.createRecord('membership-discount');

    let result = lesson.isTheSameKindAs(discount);

    assert.notOk(result);
  });
});
