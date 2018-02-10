import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';

import { computed } from 'ember-decorators/object';

export default class extends Component {
  static propTypes = {
    leads: PropTypes.number.isRequired,
    follows: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }

  @computed('leads', 'follows')
  data(leads, follows) {
    return {
      columns: [
        ['Leads', leads || 0],
        ['Follows', follows || 0]
      ],
      colors: {
        ['Leads']: '#5E35B1',
        ['Follows']: '#1E88E5'
      },
      type: 'pie'
    };
  }

  @computed('height', 'width')
  size(height, width) {
    return { height, width };
  }

  @computed('small')
  legend(isSmall) {
    return {
      hide: isSmall
    };
  }

  chartConfig = {
    label: {
      format(value) {
        return value;
      }
    }
  }
}
