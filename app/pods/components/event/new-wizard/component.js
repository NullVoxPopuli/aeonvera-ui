import Component from '@ember/component';
import { alias } from '@ember-decorators/object/computed';

export default class EventNewWizard extends Component {
  @alias('event.settings') settings;
  @alias('event.openingTier') openingTier;
};
