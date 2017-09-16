import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';

export default class extends Component {
  static propTypes = {
    targetSelector: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }

  didInsertElement() {
    this._super(...arguments);
    this.setupIntersectionObserver();
  }

  willDestroyElement() {
    this._super(...arguments);

    if (this.io) {
      this.io.disconnect();
    }
  }

  setupIntersectionObserver() {
    const io = new IntersectionObserver(entries => {
      const isVisible = (entries[0].intersectionRatio !== 0);

      this.set('isTargetVisible', isVisible);
    });

    const targetSelector = this.get('targetSelector');
    const target = document.querySelector(targetSelector);

    io.observe(target);

    this.io = io;
  }
}
