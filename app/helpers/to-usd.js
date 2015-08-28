import Ember from "ember";

export function toUsd(params) {
  let value = params[0];

  if (value === undefined){
    return value;
  }

  var amount = value.toFixed(2),
      sign = '$';

  return `${sign}${amount}`;
};

export default Ember.HTMLBars.makeBoundHelper(toUsd);
