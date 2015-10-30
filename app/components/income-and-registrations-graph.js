import Ember from 'ember';

export default Ember.Component.extend({
  data: {},
  config: {},

  dateToString: function(num){
    return (new Date(num * 1000)).toDateString().substring(4);
  },

  setData: function(){

    let model = this.get('model');
    let incomes = model.get('incomes');
    let registrationTimes = model.get('registrationTimes');
    let incomeTimes = model.get('incomeTimes');
    let registrations = model.get('registrations');
    let regTimes = [];
    let incTimes = [];

    registrationTimes.forEach(function(e){regTimes.push(new Date(e * 1000))});
    incomeTimes.forEach(function(e){incTimes.push(new Date(e * 1000))});

    let data = {
      // x1: 'x1',
       xs: {
         'Registrations': 'x1',
         'Income': 'x2'
       },
      //  xFormat: null,
      //  x1Format: null,
      //  x2Format: null,
      //  x_format: null
       columns: [
         ['x1'].concat(regTimes),
         ['x2'].concat(incTimes),
         ['Registrations'].concat(registrations),
         ['Income'].concat(incomes)
       ],
       axes: {
         'Registrations': 'y',
         'Income': 'y2'
       }
    };


    let config = {
      size: {
        height: 700
      },
      zoom: {
        enabled: true,
        rescale: true,
        onzoomed: function(domain){
          console.log(domain);

        }
      },
      grid: {
        x: {
          show: true
        }
      },
      axis: {
        y: {
          label: "Total Number of Registrants"
        },
        y2: {
          show: true,
          label: "Revenue",
          tick: {
                format: d3.format("$,")
            }
        },
        x: {
          type: 'timeseries',
          tick: {
            culling: {
              max: 100
            },
            count: 20,
            fit: true,
            rotate: 45,
            format: '%Y-%m-%d %H:%M:%S'
          }
        }
      }
    };

    this.set('config', config);
    this.set('data', data);


  }.on('willInsertElement'),

});
