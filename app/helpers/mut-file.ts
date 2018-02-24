import { helper } from '@ember/component/helper';

export function mutFile(params, hash) {
  console.log('[mutFile] ', params, this, ...arguments);
  const something = params[0];
  console.log('[]', something.modelName, something.id)
  return (...args) => {
    const value = args[0];
    console.log('args', args)
  }
  //
  // const file = e.target.files[0];
  //
  // const fileName = file.name;
  // const fileSize = file.size;
  //
  // model.set(property + 'FileName', fileName);
  // model.set(property + 'FileSize', fileSize);
  // model.get(property).update(file);
  // model.send('becomeDirty');

  // return params;
}

export default helper(mutFile);
