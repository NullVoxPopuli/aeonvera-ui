import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';
import { oneWay, or } from 'ember-decorators/object/computed';

export default class extends Ember.Component {
  static propTypes = {
    model: PropTypes.EmberObject.isRequired
  };

  @oneWay('model.id') registrationId;
  @oneWay('model.host.id') eventId;
  @oneWay('model.name') modelName;
  @or('modelName', 'backupName') name;
}
