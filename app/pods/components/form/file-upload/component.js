import Ember from 'ember';

const { TextField } = Ember;

export default TextField.extend({
  type: 'file',
  model: null,
  property: '',

  change(e) {
    let property = this.get('property');
    let model = this.get('model');
    let file = e.target.files[0];

    let fileName = file.name;
    let fileSize = file.size;
    model.set(property + 'FileName', fileName);
    model.set(property + 'FileSize', fileSize);
    model.get(property).update(file);
    model.send('becomeDirty');
  }
});
