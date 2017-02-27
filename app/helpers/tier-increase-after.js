import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  const date = params[0];
  const regs = params[1];

  const hasDate = Ember.isPresent(date);
  const hasRegLimit = Ember.isPresent(regs);

  let result = '';

  if (hasDate) {
    result = date;
  }

  if (hasDate && hasRegLimit) {
    result += ' or ';
  }

  if (hasRegLimit) {
    result += `${regs} Registrations`;
  }

  return result;
});
