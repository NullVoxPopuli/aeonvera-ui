import Ember from 'ember';

import { alias } from 'ember-decorators/object/computed';

export default class extends Ember.Component {
  @alias('model.id') id;
  @alias('model.eventId') eventId;
  @alias('model.name') name;
}
