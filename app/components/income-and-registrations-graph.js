import Ember from 'ember';

export default Ember.Component.extend({
  data: {},
  config: {},

  setData: function() {

    let model = this.get('model');
    let incomes = model.get('incomes');
    let registrationTimes = model.get('registrationTimes');
    let incomeTimes = model.get('incomeTimes');
    let registrations = model.get('registrations');
    let regTimes = [];
    let incTimes = [];

    registrationTimes.forEach(function(e) {
      regTimes.push(new Date(e * 1000));
    });
    incomeTimes.forEach(function(e) {
      incTimes.push(new Date(e * 1000));
    });

    let data = {
      xs: {
        'Registrations': 'x1',
        'Income': 'x2'
      },
      columns: [
        ['x1'].concat(regTimes), ['x2'].concat(incTimes), [
          'Registrations'
        ].concat(registrations), ['Income'].concat(incomes)
      ],
      axes: {
        'Registrations': 'y',
        'Income': 'y2'
      }
    };


    let config = {
      bindto: 'income-registrations-chart',
      size: {
        height: 700
      },
      zoom: {
        enabled: true,
        rescale: true
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

    // let chart = c3.generate(config);
    // chart.load(data);

  }.on('willInsertElement')

});
