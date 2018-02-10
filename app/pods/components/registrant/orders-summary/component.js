import { alias } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  lastObject: alias('model.lastObject')
});
