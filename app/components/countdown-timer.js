import Ember from 'ember';

export default Ember.Component.extend({
  targetDate: 5,
  output: '',
  timer: null,

  didInsertElement() {
    this._super(...arguments);
    this._startCountDown();
  },

  willDestroyElement() {
    this._super(...arguments);
    window.clearInterval(this.get(timer));
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
    }, words);

    this.set('timer', timer);
  }
});
