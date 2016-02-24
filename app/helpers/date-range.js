import Ember from 'ember';

export default Ember.Helper.helper(function (params/*, hash*/) {
  var startDate = params[0];
  var endDate = params[1];

  var formattedStartDate = moment(startDate).format('ll');
  var formattedEndDate = moment(endDate).format('ll');

  var range = formattedStartDate + ' - ' + formattedEndDate;

  return range;
});
