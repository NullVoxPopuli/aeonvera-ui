import Ember from 'ember';

const { TextField } = Ember;

export default TextField.extend({
  type: 'file',
  model: null,
  property: '',

  change(e) {
    let property = this.get('property');
    let model = this.get('model');

    model.get(property).update(e.target.files[0]);
    model.send('becomeDirty');
  }
});
