import Ember from 'ember';

import { alias } from 'ember-decorators/object/computed';

export default class extends Ember.Component {
  @alias('model.id') registrationId;
  @alias('model.host.id') eventId;
  @alias('model.name') name;
}
