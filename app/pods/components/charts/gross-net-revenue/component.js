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

  showUnpaid = false;

  @computed('net', 'fees', 'unpaid', 'showUnpaid')
  data(net, fees, unpaid, showUnpaid) {
    const data = [
      ['Net', net],
      ['Fees', fees]
    ];

    if (showUnpaid) data.push(['Unpaid', unpaid]);

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
