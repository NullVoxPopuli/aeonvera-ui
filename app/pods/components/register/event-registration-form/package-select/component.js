import Component from '@ember/component';
import RSVP from 'rsvp';
import { PropTypes } from 'ember-prop-types';
import { oneWay } from 'ember-decorators/object/computed';

export default Component.extend({
  propTypes: {
    selectedPackage: PropTypes.any,
    packages: PropTypes.any,
    onPackageSelect: PropTypes.func.isRequired,
    errors: PropTypes.any
  },

  attributeBindings: ['dataScrollRef:data-scroll-ref'],
  dataScrollRef: 'package-select',
  selectedId: null,

  actions: {
    async didChoosePackage(id) {
      const packages = await RSVP.resolve(this.get('packages'));
      const selection = packages.find(p => id && p.get('id') && p.get('id') === id);

      this.sendAction('onPackageSelect', selection);
    }
  }
});
