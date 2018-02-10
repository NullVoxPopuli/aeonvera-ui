import Mixin from '@ember/object/mixin';

export default Mixin.create({
  parentPathRoot: 'events.show',
  model: function(params) {
    const modelName = this.get('modelName');
    const path = this.get('parentPathRoot') + '.' + modelName + 's.show';

    const obj = this.modelFor(path);

    return obj;
  }
});
