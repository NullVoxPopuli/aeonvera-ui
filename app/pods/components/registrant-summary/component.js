import Ember from 'ember';
import { computed } from 'ember-decorators/object';
import { notEmpty } from 'ember-decorators/object/computed';

export default class extends Ember.Component {

  @notEmpty('model.levelName') hasLevela

  @computed('model.{attendeeFirstName,attendeeLastName}')
  attendeeName(firstName, lastName) {
    return `${firstName} ${lastName}`;
  }
}
