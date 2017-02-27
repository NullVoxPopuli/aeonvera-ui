import Ember from 'ember';

export default Ember.Helper.helper(function(params/* , hash*/) {
  const startDate = params[0];
  const endDate = params[1];

  const formattedStartDate = moment(startDate).format('ll');
  const formattedEndDate = moment(endDate).format('ll');

  const range = formattedStartDate + ' - ' + formattedEndDate;

  return range;
});
