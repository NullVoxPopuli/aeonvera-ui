import Controller from '@ember/controller';
import { alias } from 'ember-decorators/object/computed';

export default Controller.extend({
  @alias('model.registration') registration: null
});
