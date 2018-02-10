import Component from '@ember/component';
import { isBlank, isPresent } from '@ember/utils';

export default Component.extend({
  targetDate: 5,
  output: '',
  timer: null,
  model: null, // optional

  didReceiveAttrs() {
    this._super(...arguments);
    this._startCountDown();
  },

  willDestroyElement() {
    this._super(...arguments);
    window.clearInterval(this.get('timer'));
  },

  _startCountDown() {
    const targetDate = this.get('targetDate');
    const words = countdown.MONTHS |
                countdown.DAYS |
                countdown.HOURS |
                countdown.MINUTES |
                countdown.SECONDS;

    const timer = countdown(targetDate, timer => {
      this.set('output', timer);
      this._updateForm();

      if (isBlank(timer.toString())) {
        this.sendAction('onCompletion');
      }
    }, words);

    this.set('timer', timer);
  },

  _updateForm() {
    const model = this.get('model');

    if (isPresent(model)) {
      model.notifyPropertyChange('registrationIsOpen');
    }
  }
});
