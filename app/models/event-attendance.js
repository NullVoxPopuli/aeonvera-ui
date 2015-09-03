import DS from 'ember-data';
import Attendance from '../models/attendance';

export default Attendance.extend({
  competitionResponses: DS.hasMany('competitionResponse')
});
