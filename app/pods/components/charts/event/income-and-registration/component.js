import Component from '@ember/component';

export default Component.extend({
  data: {},
  config: {},
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
      label: 'Total Number of Registrants'
    },
    y2: {
      show: true,
      label: 'Revenue',
      tick: {
        format: d3.format('$,')
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
  },

  willRender() {
    this._super(...arguments);
    this._fillData();
  },

  _fillData() {
    const model = this.get('model');
    const incomes = model.get('incomes');
    const registrationTimes = model.get('registrationTimes');
    const incomeTimes = model.get('incomeTimes');
    const registrations = model.get('registrations');
    const regTimes = [];
    const incTimes = [];

    registrationTimes.forEach(function(e) {
      regTimes.push(e * 1000);
    });

    incomeTimes.forEach(function(e) {
      incTimes.push((e * 1000));
    });

    const data = {
      xs: {
        Registrations: 'x1',
        Income: 'x2'
      },
      columns: [
        ['x1'].concat(regTimes), ['x2'].concat(incTimes), [
          'Registrations'
        ].concat(registrations), ['Income'].concat(incomes)
      ],
      axes: {
        Registrations: 'y',
        Income: 'y2'
      }
    };

    this.set('data', data);
  }

});
