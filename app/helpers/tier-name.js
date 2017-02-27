import Ember from 'ember';
import FormatWithDate from 'aeonvera/helpers/date-with-format';
import IncreaseAfter from 'aeonvera/helpers/tier-increase-after';

// the alternative from the expanded:
// tier-increase-after \
//    (date-with-format tier.increaseAfterDate 'LLL' true)
//    tier.increaseAfterTotalRegistrants
export default Ember.Helper.helper(function(params) {
  const tier = params[0];

  const date = tier.get('increaseAfterDate');
  const regs = tier.get('increaseAfterTotalRegistrants');
  const formattedDate = FormatWithDate.compute([date, 'LLL', true]);
  const result = IncreaseAfter.compute([formattedDate, regs]);

  return result;
});
