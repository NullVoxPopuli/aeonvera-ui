import Ember from 'ember';
import { alias } from 'ember-decorators/object/computed';

export default Ember.Controller.extend({
  @alias('model.registration') registration: null
});
