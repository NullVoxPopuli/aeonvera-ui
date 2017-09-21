import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';
import { dropTask } from 'ember-concurrency-decorators';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default class extends Component {
  static propTypes = {
    registration: PropTypes.EmberObject.isRequired,
    levels: PropTypes.array.isRequired
  }

  @service('flash-notification') flash;

  @dropTask
  updateLevel = function * (newLevel) {
    const flash = this.get('flash');
    const registration = this.get('registration');
    const originalLevel = registration.get('level');
    const name = registration.get('name');

    if (originalLevel === newLevel) return;

    registration.set('level', newLevel);
    const levelName = newLevel.get('name');

    try {
      yield registration.save();

      flash.success(`Updated: ${name} is now doing: ${levelName}`);
    } catch (e) {
      flash.error(e);
    }
  }

  @action
  update(selection) {
    this.get('updateLevel').perform(selection);
  }
}
