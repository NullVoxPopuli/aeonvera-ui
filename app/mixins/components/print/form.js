import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  additionalRows: 0,
  additionalRowsArray: computed('additionalRows', {
    get() {
      const newRows = this.get('additionalRows');
      const result = [];

      for (let i = 0; i < newRows; i++) {
        result.push(i);
      }

      return result;
    }
  })
});
