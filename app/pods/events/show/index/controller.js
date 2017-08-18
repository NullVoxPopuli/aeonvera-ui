import Ember from 'ember';

import { computed } from 'ember-decorators/object';
import { alias } from 'ember-decorators/object/computed';

export default class extends Ember.Controller {
  @alias('model.summary') summary;
  @alias('summary.totalRegistrants') total;
  @alias('summary.numberOfLeads') leads;
  @alias('summary.numberOfFollows') follows;
}
