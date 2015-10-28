import Ember from "ember";

export default Ember.Helper.helper(function(params){
  let date = params[0];
  let regs = params[1];

  let hasDate = Ember.isPresent(date);
  let hasRegLimit = Ember.isPresent(regs);

  let result = ''

  if (hasDate){
      result = date
  }

  if (hasDate && hasRegLimit){
    result += ' or '
  }

  if (hasRegLimit){
    result += `${regs} Registrations`
  }

  return result;
});
