import Ember from 'ember';

// for date, see http://momentjs.com/
export function dateWithFormat(params) {
  return moment(params[0]).format(params[1]);
}

export default Ember.HTMLBars.makeBoundHelper(dateWithFormat);
