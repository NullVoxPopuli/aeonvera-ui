import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({
  // passed in
  event: null,

  // managed by this component
  data: {},

  didRender() {
    this._super(...arguments);
    this._buildData().then(chart => {
      this.set('data', chart.get('rootNode'));
      this._drawGraph();
    });
  },

  _buildData() {
    const event = this.get('event');

    return this.store.findRecord('chart', `${event.id}-registration-breakdown`, {
      adapterOptions: {
        query: {
          event_id: event.get('id'),
          chart_type: 'sunburt-registration-breakdown'
        }
      }
    });
  },

  _drawGraph() {
    const explanationId = 'chart-event-sunburst-explanation';
    const chartId = 'chart-event-sunburst';

    const width = $(`#${chartId}`).parent().parent().width();
    const height = 400;
    const duration = 1000;
    const radius = Math.min(width, height) / 2;
    const padding = 0;
    // https://www.materialui.co/colors
    const color = d3.scale.ordinal().range([
      //       Green   Blue      Yellow     Red
      '#fff', '#B3D2B2', '#9FBBCC', '#AF87C6', '#EDB8B8',

      '#bcc3db', '#c0a9b0', '#7880b5', '#6987c9', '#6bbaec'

      // attempt to make the two halves their own color scheme
      // inner,
      // '#bbbbbb', '#0D47A1', '#4A148C', '#f00', '#00f', '#0f0', '#ff0', '#0ff', '#f0f', '#f00', '#fc9',
      // '#fff', '#0D47A1', '#4A148C', '#FDD835', '#F4511E', '#f44336', '#E91E63', '#009688', '#E91E63', '#FFEB3B', '#03A9F4'
    ]);
    // const color = d3.scale.category20c();

    const x = d3.scale.linear().range([0, 2 * Math.PI]);
    // var y = d3.scale.sqrt().range([0, radius]);
    const y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]);

    const svg = d3.select(`#${chartId}`)
      .append('div')
      .classed('d3-svg-container', true)
      .append('svg')
      // responsive SVG needs these 2 attributes and no width and height attr
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${width} ${height}`)
      // class to make it responsive
      .classed('svg-content-responsive', true)
      // .attr('width', width)
      // .attr('height', height)
      .append('g')
      .attr('id', 'container')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    this.set('svg', svg);

    const partition = d3.layout.partition()
      .sort(function(a, b) {
        return d3.ascending(a.name, b.name);
      })
      // .size([2 * Math.PI, radius * radius])
      .value(d => d.size);
    // .value(function(d) { return 1; });

    const arc = d3.svg.arc()
      .startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x))))
      .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))))
      .innerRadius(d => Math.max(0, d.y ? y(d.y) : d.y))
      .outerRadius(d => Math.max(0, y(d.y + d.dy)));
    let node;

    const root = this.get('data');
    const nodes = partition.nodes(root);

    node = root;

    const path = svg.selectAll('path').data(nodes);

    path.enter().append('path')
      .attr('id', (d, i) => `path-${i}`)
      .attr('d', arc)
      .style('stroke', '#fff')
      .style('fill-rule', 'evenodd')
      .style('fill', d => color(d.name))
      .on('click', click);

    // Computes the label angle of an arc, converting from radians to degrees.
    function getAngle(d) {
      // Offset the angle by 90 deg since the '0' degree axis for arc is Y axis, while
      // for text it is the X axis.
      const thetaDeg = (180 / Math.PI * (arc.startAngle()(d) + arc.endAngle()(d)) / 2 - 90);
      // If we are rotating the text by more than 90 deg, then "flip" it.
      // This is why "text-anchor", "middle" is important, otherwise, this "flip" would
      // a little harder.

      return (thetaDeg > 90) ? thetaDeg - 180 : thetaDeg;
    }

    function transformText(d) {
      if (d.depth > 0) {
        return 'translate(' + arc.centroid(d) + ')' +
               'rotate(' + getAngle(d) + ')';
      }
      return '';

    }

    const text = svg.selectAll('text').data(nodes);
    const textEnter = text.enter().append('text')
      .style('fill-opacity', 1)
      .style('font-size', 10)
      .style('text-anchor', 'middle')
      .style('fill', '#000')
      .attr('dy', '.2em')
      .attr('transform', transformText)
      .on('click', click);

    textEnter.append('tspan')
      .attr('x', 0)
      .text(d => d.depth ? d.size + '  |   ' + d.name.split(' - ')[0] : '');
    textEnter.append('tspan')
      .attr('x', 0)
      .attr('dy', '1em')
      .text(d => d.depth ? '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + (d.name.split(' - ')[1] || '') : '');
    // textEnter.append('tspan')
    //     .attr('x', 0)
    //     .attr('dy', d => d.depth ? (d.name.split(' - ').length > 1 ? '-2em' : '-1em') : '')
    //     .text(d => d.size);

    function click(d) {
      path.transition()
        .duration(duration)
        .attrTween('d', arcTween(d));

      // Somewhat of a hack as we rely on arcTween updating the scales.
      text.style('visibility', e => isParentOf(d, e) ? null : d3.select(this).style('visibility'))
        .transition()
        .duration(duration)
        .attrTween('transform', d => () => transformText(d))
        .style('fill-opacity', function(e) {
          return isParentOf(d, e) ? 1 : 1e-6;
        })
        .each('end', function(e) {
          d3.select(this).style('visibility', isParentOf(d, e) ? null : 'hidden');
        });
    }

    function isParentOf(p, c) {
      if (p === c) {
        return true;
      }
      if (p.children) {
        return p.children.some(function(d) {
          return isParentOf(d, c);
        });
      }

      return false;
    }

    // Interpolate the scales!
    function arcTween(d) {
      let my = maxY(d),
        xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        yd = d3.interpolate(y.domain(), [d.y, my]),
        yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);

      return function(d) {
        return function(t) {
          x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d);
        };
      };
    }

    function maxY(d) {
      return d.children ? Math.max(...d.children.map(maxY)) : d.y + d.dy;
    }

    // http://www.w3.org/WAI/ER/WD-AERT/#color-contrast
    function brightness(rgb) {
      return rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
    }
  }
});
