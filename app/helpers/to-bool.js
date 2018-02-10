import { helper } from '@ember/component/helper';

export default helper(function(params) {
  const value = params[0];

  const boolValue = (
    value === true ||
    value === 't');

  return boolValue ? 'Yes' : 'No';
});
