import Ember from 'ember';
import FormatWithDate from 'aeonvera/helpers/date-with-format';
import IncreaseAfter from 'aeonvera/helpers/tier-increase-after';
// the alternative from the expanded:
// tier-increase-after \
//    (date-with-format tier.increaseAfterDate 'LLL' true)
//    tier.increaseAfterTotalRegistrants
export default Ember.Helper.helper(function(params) {
  let tier = params[0];

  let date = tier.get(increaseAfterDate);
  let regs = tier.get(tier.increaseAfterTotalRegistrants);
  let formattedDate = FormatWithDate(date, 'LLL', true);
  let result = IncreaseAfter(formattedDate, regs);

  return result;
});
