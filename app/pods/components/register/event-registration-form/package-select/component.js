import Ember from 'ember';
import RSVP from 'rsvp';
import { PropTypes } from 'ember-prop-types';
import { oneWay } from 'ember-computed-decorators';

export default Ember.Component.extend({
  propTypes: {
    selectedPackage: PropTypes.any,
    packages: PropTypes.any,
    onPackageSelect: PropTypes.func.isRequired,
    errors: PropTypes.any
  },

  attributeBindings: ['dataScrollRef:data-scroll-ref'],
  dataScrollRef: 'package-select',

  @oneWay('selectedPackage.id') selectedId: null,

  actions: {
    didChoosePackage(id) {
      RSVP.resolve(this.get('packages')).then(packages => {
        const selection = packages.find(p => p.get('id') === id);

        this.set('selectedPackage', selection);
        this.sendAction('onPackageSelect', selection);
      });
    }
  }
});
