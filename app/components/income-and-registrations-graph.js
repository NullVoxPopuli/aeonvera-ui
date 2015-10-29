import Ember from 'ember';

export default Ember.Component.extend({
  data: {},
  config: {},

  setData: function(){

    let model = this.get('model');
    let incomes = model.get('incomes');
    let registrationTimes = model.get('registrationTimes');
    let incomeTimes = model.get('incomeTimes');
    let registrations = model.get('registrations');

    let data = {
       xs: {
         'Registrations': 'x1',
         'Income': 'x2'
       },
       columns: [
         ['x1'].concat(registrationTimes),
         ['x2'].concat(incomeTimes),
         ['Registrations'].concat(registrations),
         ['Income'].concat(incomes)
       ],
       axes: {
         'Registrations': 'y',
         'Income': 'y2'
       }
    };


    let config = {
      axis: {
        y2: {
          show: true
        },
        x1: {
          type: 'timeseries',
          format: '%Y-%m-%d'
        },
        x2: {
          type: 'timeseries',
          format: '%Y-%m-%d'
        }
      }
    };

    this.set('config', config);
    this.set('data', data);


  }.on('willInsertElement'),

});
