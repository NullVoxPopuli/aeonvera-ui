import Ember from 'ember';
import { action } from 'ember-decorators/object';

const { controller } = Ember.inject;

export default class extends Ember.Controller {
  controller = controller('event-at-the-door.a-la-carte');

  @action
  add(lineItem) {
    this.get('controller').send('add', lineItem);
  }

  @action
  remove(item) {
    this.get('controller').send('remove', item);
  }
}
