import Ember from 'ember';

const { TextField } = Ember;

export default TextField.extend({
  type: 'file',
  model: null,
  property: '',

  change(e) {
    const property = this.get('property');
    const model = this.get('model');
    const file = e.target.files[0];

    const fileName = file.name;
    const fileSize = file.size;

    model.set(property + 'FileName', fileName);
    model.set(property + 'FileSize', fileSize);
    model.get(property).update(file);
    model.send('becomeDirty');
  }
});
