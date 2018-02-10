import { helper } from '@ember/component/helper';

export default helper(function(params/* , hash*/) {
  const cents = params[0];

  return cents / 100.0;
});
