import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('order', 'Integration | Model | Order', {
  integration: true,
  beforeEach(){
    this.inject.service('store');
  }
});

test('getOrderLineItemMatching | gets a single item', function(assert){
  Ember.run(() => {
    let lesson = this.store.createRecord('lesson', {name: 'lesson'});
    let order = this.store.createRecord('order');
    order.addLineItem(lesson);
    let result = order.getOrderLineItemMatching(lesson);

    assert.equal(result.get('lineItem.name'), lesson.get('name'));
  });
});
