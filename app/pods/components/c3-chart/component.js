import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { getProperties } from 'ember-metal/get';
import { debounce, later, scheduleOnce } from 'ember-runloop';
import { bb } from 'billboard.js';

export default Component.extend({
  tagName: 'div',
  classNames: ['billboard-chart-component'],

  // triggered when data is updated by didUpdateAttrs
  _reload() {
    const chart = get(this, 'bbchart');

    // if data should not be appended
    // e.g. when using a pie or donut chart
    if ( get(this, 'unloadDataBeforeChange') ) {
      chart.unload();
      // default animation is 350ms
      // t/f data must by loaded after unload animation (400)
      // or chart will not properly render
      later(this, function() {
        chart.load(
          // data, axis, color are only mutable elements
          get(this, 'data'),
          get(this, 'axis'),
          get(this, 'color')
        );
      }, 400);
    } else {
      chart.load(
        get(this, 'data'),
        get(this, 'axis'),
        get(this, 'color')
      );
    }
  },

  // triggered when component added by didInsertElement
  _setupbb() {
    // get all base bb properties
    const chartConfig = getProperties(this,
      ['data','axis','regions','bar','pie','donut','gauge',
      'grid','legend','tooltip','subchart','zoom','point',
      'line','area','size','padding','color','transition']);

    // bind bb chart to component's DOM element
    chartConfig.bindto = get(this, 'element');

    // emit events to controller
    callbacks.call(this);
    function callbacks() {
      const that = this;
      const bbevents = [
        'oninit',
        'onrendered',
        'onmouseover',
        'onmouseout',
        'onresize',
        'onresized'
      ];
      bbevents.forEach((event) => {
        chartConfig[event] = function() {
          that.sendAction(event, that);
        };
      });
    }

    // render the initial chart
    console.log(bb);
    set(this, 'bbchart', bb.generate(chartConfig));
  },

  /***
   * Component lifecycle hooks to control rendering actions
   ***/

  didReceiveAttrs() {
    // if DOM is not ready when component is inserted,
    // rendering issues can occur
    // t/f use 'afterRender' property to ensure
    // state readiness
    try {
      scheduleOnce('afterRender', this, this._setupbb);
    } catch(err) {
      console.log(err);
    }
  },

  didUpdateAttrs() {
    // if data proprety is dependent on async relationships,
    // animations can cause buggy renders, therefore debounce
    // component update to ensure proper visualization
    debounce(this, this._reload, 360);
  },

  willDestroyElement() {
    // execute teardown method
    this._super();
    get(this, 'bbchart').destroy();
  }
});
