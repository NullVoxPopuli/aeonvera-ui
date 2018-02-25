import { helper } from '@ember/component/helper';

export function mutFile(params, hash) {
  const [model, fileFieldBaseName, ..._others] = params;

  return (...args) => {
    const file = args[0];

    const fileName = file.name;
    const fileSize = file.size;

    model.set(`${fileFieldBaseName}FileName`, fileName);
    model.set(`${fileFieldBaseName}FileSize`, fileSize);

    model.get(fileFieldBaseName).update(file);
    model.send('becomeDirty');

  }
  // return params;
}

export default helper(mutFile);
