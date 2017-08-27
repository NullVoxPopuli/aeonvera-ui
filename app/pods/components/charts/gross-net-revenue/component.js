import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';

import { computed } from 'ember-decorators/object';

import { toUsd } from 'aeonvera/helpers/to-usd';

export default class extends Ember.Component {
  static propTypes = {
    net: PropTypes.number.isRequired,
    fees: PropTypes.number.isRequired,
    unpaid: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }

  showFees = false;

  @computed('net', 'fees', 'unpaid', 'showFees')
  data(net, fees, unpaid, showFees) {
    const data = [
      ['Net', net],
      ['Unpaid', unpaid]
    ];

    if (showFees) data.push(['Fees', fees]);

    return {
      columns: data,
      colors: {
        ['Net']: '#4CAF50',
        ['Fees']: '#F44336',
        ['Unpaid']: '#2196F3'
      },
      type: 'pie'
    };
  }

  @computed('height', 'width')
  size(height, width) {
    return { height, width };
  }

  chartConfig = {
    label: {
      format(value) {
        return toUsd(value);
      }
    }
  }
}
