import Ember from 'ember';

export default Ember.Helper.helper(function (params) {
  let date = params[0];
  let format = params[1];
  let allowBlank = params[2];

  if (typeof (date) === 'number') {
    date = new Date(date * 1000);
  }

  if (!Ember.isPresent(date) && allowBlank) {
    return '';
  }

  return moment(date).format(format);
});
