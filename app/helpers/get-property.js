import { helper } from '@ember/component/helper';

export default helper(function(params) {
  const object = params[0];
  const property = params[1];

  if (object.get !== undefined) {
    return object.get(property);
  }
  return object[property];

});
