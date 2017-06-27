import Ember from 'ember';
import { alias } from 'ember-computed-decorators';

export default Ember.Controller.extend({
  @alias('model.registration') registration: null
});
