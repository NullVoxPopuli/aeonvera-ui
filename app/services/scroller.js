import $ from 'jquery';
import { computed } from '@ember/object';
import Scroller from 'ember-scroll-to/services/scroller';

export default Scroller.extend({
  scrollable: computed(function() {
    return $('.inner-wrap');
  })
});
