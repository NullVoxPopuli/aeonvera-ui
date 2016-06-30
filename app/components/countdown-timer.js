import Ember from 'ember';

export default Ember.Component.extend({
  targetDate: 5,
  output: '',
  timer: null,
  model: null, // optional

  didInsertElement() {
    this._super(...arguments);
    this._startCountDown();
  },

  willDestroyElement() {
    this._super(...arguments);
    window.clearInterval(this.get('timer'));
  },

  _startCountDown() {
    let targetDate = this.get('targetDate');
    let words = countdown.MONTHS |
                countdown.DAYS |
                countdown.HOURS |
                countdown. MINUTES |
                countdown.SECONDS;

    let timer = countdown(targetDate, timer => {
      this.set('output', timer);
      this._updateForm();
    }, words);

    this.set('timer', timer);
  },

  _updateForm() {
    let model = this.get('model');
    if (Ember.isPresent(model)) {
      model.notifyPropertyChange('registrationIsOpen');
    }
  }
});
