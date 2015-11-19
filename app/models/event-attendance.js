import DS from 'ember-data';
import Attendance from '../models/attendance';

export default Attendance.extend({
  level: DS.belongsTo('level'),
  competitionResponses: DS.hasMany('competitionResponse')
});
